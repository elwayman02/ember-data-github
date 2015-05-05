import {
  module,
  test
} from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';
import Ember from 'ember';

var server, app, container, store;

module('github-organization', {
  setup: function() {
    server = new Pretender();
    server.prepareBody = function(body){ return JSON.stringify(body); };
    app = startApp();
    container = app.__container__;
    store = container.lookup("store:main");
  },
  teardown: function() {
    Ember.run(app, 'destroy');
    server.shutdown();
  }
});

test('finding an organization without authorization', function(assert) {
  assert.expect(7);

  server.get('/orgs/Organization1', function(request) {
    return [200, {}, Factory.build('organization')];
  });

  return Ember.run(function () {
    return store.find('githubOrganization', 'Organization1').then(function(organization) {
      assertGithubOrganizationOk(assert, organization);
      assert.equal(store.all('githubOrganization').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});

test('finding an organization', function(assert) {
  assert.expect(7);

  container.lookup('service:session').set('githubAccessToken', 'abc123');
  server.get('/orgs/organization1', function(request) {
    return [200, {}, Factory.build('organization')];
  });

  return Ember.run(function () {
    return store.find('githubOrganization', 'organization1').then(function(organization) {
      assertGithubOrganizationOk(assert, organization);
      assert.equal(store.all('githubOrganization').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test('finding an organization\'s repositories', function(assert) {
  assert.expect(7);

  container.lookup('service:session').set('githubAccessToken', 'abc123');
  server.get('/orgs/organization1', function(request) {
    return [200, {}, Factory.build('organization')];
  });
  server.get('/orgs/organization1/repos', function(request) {
    var response = [
      Factory.build('repository'),
      Factory.build('repository')
    ];
    return [200, {}, response];
  });

  return Ember.run(function () {
    return store.find('githubOrganization', 'organization1').then(function(organization) {
      return organization.get('githubRepositories').then(function(repositories) {
        assert.equal(repositories.get('length'), 2);
        assertGithubRepositoryOk(assert, repositories.toArray()[0]);
        assert.equal(server.handledRequests.length, 2);
        assert.equal(server.handledRequests[1].requestHeaders.Authorization, 'token abc123');
      });
    });
  });
});
