/* global Factory */
import { run } from '@ember/runloop';

import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Pretender from 'pretender';

let server, container, store;

moduleForAcceptance('Acceptance | github organization', {
  beforeEach() {
    server = new Pretender();
    server.prepareBody = function (body) {
      return JSON.stringify(body);
    };
    container = this.application.__container__;
    store = run(container, 'lookup', 'service:store');
  },

  afterEach() {
    server.shutdown();
  }
});

test('finding an organization without authorization', function (assert) {
  server.get('/orgs/Organization1', () => {
    return [200, {}, Factory.build('organization')];
  });

  return run(() => {
    return store.findRecord('githubOrganization', 'Organization1').then((organization) => {
      assert.githubOrganizationOk(organization);
      assert.equal(store.peekAll('githubOrganization').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});

test('finding an organization', function (assert) {
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/orgs/organization1', () => {
    return [200, {}, Factory.build('organization')];
  });

  return run(() => {
    return store.findRecord('githubOrganization', 'organization1').then((organization) => {
      assert.githubOrganizationOk(organization);
      assert.equal(store.peekAll('githubOrganization').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test(`finding an organization's repositories`, function (assert) {
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/orgs/organization1', () => {
    return [200, {}, Factory.build('organization')];
  });
  server.get('/orgs/organization1/repos', () => {
    let response = [
      Factory.build('repository'),
      Factory.build('repository')
    ];
    return [200, {}, response];
  });

  return run(() => {
    return store.findRecord('githubOrganization', 'organization1').then((organization) => {
      return organization.get('githubRepositories').then(function (repositories) {
        assert.equal(repositories.get('length'), 2);
        assert.githubRepositoryOk(repositories.toArray()[0]);
        assert.equal(server.handledRequests.length, 2);
        assert.equal(server.handledRequests[1].requestHeaders.Authorization, 'token abc123');
      });
    });
  });
});
