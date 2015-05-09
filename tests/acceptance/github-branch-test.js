import {
  module,
  test
} from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';
import Ember from 'ember';

var server, app, container, store;

module('github-branch', {
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

test('finding a branch without authorization', function(assert) {
  server.get('/repos/User1/Repository1/branches/Branch1', function(request) {
    return [200, {}, Factory.build('branch')];
  });

  return Ember.run(function () {
    return store.find('githubBranch', 'User1/Repository1/branches/Branch1').then(function(branch) {
      assertGithubBranchOk(assert, branch);
      assert.equal(store.all('githubBranch').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});

test('finding a branch', function(assert) {
  container.lookup('service:session').set('githubAccessToken', 'abc123');
  server.get('/repos/user1/repository1/branches/branch1', function(request) {
    return [200, {}, Factory.build('branch')];
  });

  return Ember.run(function () {
    return store.find('githubBranch', 'user1/repository1/branches/branch1').then(function(branch) {
      assertGithubBranchOk(assert, branch);
      assert.equal(store.all('githubBranch').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});
