import {
  module,
  test
} from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';
import Ember from 'ember';

var server, app, container, store;

module('github-user', {
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
  assert.expect(5);

  container.lookup('service:session').set('githubAccessToken', 'abc123');
  server.get('github-api/user', function(request) {
    return [200, {}, Factory.build('user')];
  });

  return Ember.run(function () {
    return store.find('githubUser', '').then(function(user) {
      assert.equal(user.get('id'), 'user1');
      assert.equal(user.get('name'), 'User 1');
      assert.equal(user.get('avatarUrl'), 'user1-avatar.gif');
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});
