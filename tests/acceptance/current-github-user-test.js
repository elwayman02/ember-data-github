import {
  module,
  test
} from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';
import Ember from 'ember';

var server, app, container, store;

module('current-github-user', {
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

test('finding current user', function(assert) {
  assert.expect(8);

  container.lookup('service:session').set('githubAccessToken', 'abc123');
  server.get('/user', function(request) {
    return [200, {}, Factory.build('user')];
  });

  return Ember.run(function () {
    return store.find('githubUser', '#').then(function(user) {
      assertGithubUserOk(assert, user);
      assert.equal(store.all('githubUser').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test('finding current user\'s repositories', function(assert) {
  assert.expect(7);

  container.lookup('service:session').set('githubAccessToken', 'abc123');
  server.get('/user', function(request) {
    return [200, {}, Factory.build('user')];
  });
  server.get('/user/repos', function(request) {
    var response = [
      Factory.build('repository'),
      Factory.build('repository')
    ];
    return [200, {}, response];
  });

  return Ember.run(function () {
    return store.find('githubUser', '#').then(function(user) {
      return user.get('githubRepositories').then(function(repositories) {
        assert.equal(repositories.get('length'), 2);
        assertGithubRepositoryOk(assert, repositories.toArray()[0]);
        assert.equal(server.handledRequests.length, 2);
        assert.equal(server.handledRequests[1].requestHeaders.Authorization, 'token abc123');
      });
    });
  });
});
