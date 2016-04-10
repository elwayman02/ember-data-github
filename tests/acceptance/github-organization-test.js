import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from 'dummy/tests/helpers/start-app';
import Pretender from 'pretender';
import Ember from 'ember';

const { run } = Ember;

let server, app, container, store;

moduleForAcceptance('Acceptance | github organization', {
  beforeEach() {
    server = new Pretender();
    server.prepareBody = function(body){ return JSON.stringify(body); };
    app = startApp();
    container = app.__container__;
    store = run(container, 'lookup', 'service:store');
  },

  afterEach() {
    server.shutdown();
    run(app, app.destroy);
    Ember.BOOTED = false;
  }
});

test('finding an organization without authorization', function(assert) {
  server.get('/orgs/Organization1', () => {
    return [200, {}, Factory.build('organization')];
  });

  return run(() => {
    return store.findRecord('githubOrganization', 'Organization1').then((organization) => {
      assertGithubOrganizationOk(assert, organization);
      assert.equal(store.peekAll('githubOrganization').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});

test('finding an organization', function(assert) {
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/orgs/organization1', () => {
    return [200, {}, Factory.build('organization')];
  });

  return run(() => {
    return store.findRecord('githubOrganization', 'organization1').then((organization) => {
      assertGithubOrganizationOk(assert, organization);
      assert.equal(store.peekAll('githubOrganization').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test('finding an organization\'s repositories', function(assert) {
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/orgs/organization1', () => {
    return [200, {}, Factory.build('organization')];
  });
  server.get('/orgs/organization1/repos', () => {
    const response = [
      Factory.build('repository'),
      Factory.build('repository')
    ];
    return [200, {}, response];
  });

  return run(() => {
    return store.findRecord('githubOrganization', 'organization1').then((organization) => {
      return organization.get('githubRepositories').then(function(repositories) {
        assert.equal(repositories.get('length'), 2);
        assertGithubRepositoryOk(assert, repositories.toArray()[0]);
        assert.equal(server.handledRequests.length, 2);
        assert.equal(server.handledRequests[1].requestHeaders.Authorization, 'token abc123');
      });
    });
  });
});

