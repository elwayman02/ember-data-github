/* global Factory */
import { run } from '@ember/runloop';

import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Pretender from 'pretender';

let server, container, store;

moduleForAcceptance('Acceptance | github user', {
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

test('finding a user without authorization', function (assert) {
  server.get('/users/User1', () => {
    return [200, {}, Factory.build('user')];
  });

  return run(() => {
    return store.findRecord('githubUser', 'User1').then((user) => {
      assert.githubUserOk(user);
      assert.equal(store.peekAll('githubUser').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});

test('finding a user', function (assert) {
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/users/user1', () => {
    return [200, {}, Factory.build('user')];
  });

  return run(() => {
    return store.findRecord('githubUser', 'user1').then((user) => {
      assert.githubUserOk(user);
      assert.equal(store.peekAll('githubUser').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test('finding all users', function (assert) {
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/users', () => {
    let response = [
      Factory.build('user'),
      Factory.build('user')
    ];
    return [200, {}, response];
  });

  return run(() => {
    return store.findAll('githubUser').then((users) => {
      assert.equal(users.get('length'), 2);
      assert.githubUserOk(users.toArray()[0]);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test(`finding a user's repositories`, function (assert) {
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/users/user1', () => {
    return [200, {}, Factory.build('user')];
  });
  server.get('/users/user1/repos', () => {
    let response = [
      Factory.build('repository'),
      Factory.build('repository')
    ];
    return [200, {}, response];
  });

  return run(() => {
    return store.findRecord('githubUser', 'user1').then((user) => {
      return user.get('githubRepositories').then((repositories) => {
        assert.equal(repositories.get('length'), 2);
        assert.githubRepositoryOk(repositories.toArray()[0]);
        assert.equal(server.handledRequests.length, 2);
        assert.equal(server.handledRequests[1].requestHeaders.Authorization, 'token abc123');
      });
    });
  });
});
