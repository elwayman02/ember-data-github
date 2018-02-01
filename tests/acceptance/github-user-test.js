import { run } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let container, store;

moduleForAcceptance('Acceptance | github user', {
  beforeEach() {
    container = this.application.__container__;
    store = run(container, 'lookup', 'service:store');
  }
});

test('finding a user without authorization', function (assert) {
  assert.expect(4);

  server.create('github-user');

  return run(() => {
    return store.findRecord('githubUser', 'User1').then((user) => {
      assert.githubUserOk(user);
      assert.equal(store.peekAll('githubUser').get('length'), 1);
      assert.equal(server.pretender.handledRequests.length, 1);
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});

test('finding a user by login', function (assert) {
  assert.expect(4);

  server.create('github-user');
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findRecord('githubUser', 'user1').then((user) => {
      assert.githubUserOk(user);
      assert.equal(store.peekAll('githubUser').get('length'), 1);
      assert.equal(server.pretender.handledRequests.length, 1);
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test('finding a user by id', function (assert) {
  assert.expect(4);

  server.create('github-user');
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findRecord('githubUser', 1).then((user) => {
      assert.githubUserOk(user);
      assert.equal(store.peekAll('githubUser').get('length'), 1);
      assert.equal(server.pretender.handledRequests.length, 1);
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test('finding all users', function (assert) {
  assert.expect(4);

  server.createList('github-user', 2);
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findAll('githubUser').then((users) => {
      assert.equal(users.get('length'), 2);
      assert.githubUserOk(users.toArray()[0]);
      assert.equal(server.pretender.handledRequests.length, 1);
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test(`finding a user's repositories`, function (assert) {
  assert.expect(4);

  server.create('githubUser', 'withRepositories');
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findRecord('githubUser', 'user1').then((user) => {
      return user.get('githubRepositories').then((repositories) => {
        assert.equal(repositories.get('length'), 2);
        assert.githubRepositoryOk(repositories.toArray()[0]);
        assert.equal(server.pretender.handledRequests.length, 2);
        assert.equal(server.pretender.handledRequests[1].requestHeaders.Authorization, 'token abc123');
      });
    });
  });
});
