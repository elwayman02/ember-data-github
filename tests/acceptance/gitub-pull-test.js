import { run } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let container, store;

moduleForAcceptance('Acceptance | github pull', {
  beforeEach() {
    container = this.application.__container__;
    store = run(container, 'lookup', 'service:store');
  }
});

test('finding a pull request without authorization', function (assert) {
  assert.expect(4);

  server.create('github-pull');

  return run(() => {
    return store.queryRecord('githubPull', { repo: 'user1/repository1', pullId: '1' }).then((pull) => {
      assert.githubPullOk(pull);
      assert.equal(store.peekAll('githubPull').get('length'), 1, 'loads 1 pull');
      assert.equal(server.pretender.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, undefined, 'has no authorization token');
    });
  });
});

test('finding a pull request', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.create('github-pull');

  return run(() => {
    return store.queryRecord('githubPull', { repo: 'user1/repository0', pullId: '1' }).then((pull) => {
      assert.githubPullOk(pull);
      assert.equal(store.peekAll('githubPull').get('length'), 1, 'loads 1 pull');
      assert.equal(server.pretender.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});

test('finding all pull requests', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  let repository = server.create('githubRepository');
  server.createList('github-pull', 2, { repository });

  return run(() => {
    return store.query('githubPull', { repo: 'user1/repository0' }).then((pulls) => {
      assert.githubPullOk(pulls.toArray()[0]);
      assert.equal(store.peekAll('githubPull').get('length'), 2, 'loads 2 pulls');
      assert.equal(server.pretender.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});

test('getting a pull request\'s author', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.create('github-pull');

  return run(() => {
    return store.queryRecord('githubPull', { repo: 'user1/repository0', pullId: '1' }).then((pull) => {
      return pull.get('user').then(function (user) {
        assert.githubUserOk(user);
        assert.equal(store.peekAll('githubUser').get('length'), 1, 'loads 1 user');
        assert.equal(server.pretender.handledRequests.length, 1, 'handles 1 requests');
        assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});
