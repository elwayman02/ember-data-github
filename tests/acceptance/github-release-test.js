import { run } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let container, store;

moduleForAcceptance('Acceptance | github release', {
  beforeEach() {
    container = this.application.__container__;
    store = run(container, 'lookup', 'service:store');
  }
});

test('finding a release without authorization', function (assert) {
  assert.expect(4);

  server.create('github-release');

  return run(() => {
    return store.queryRecord('githubRelease', { repo: 'user1/repository1', releaseId: '1' }).then((release) => {
      assert.githubReleaseOk(release);
      assert.equal(store.peekAll('githubRelease').get('length'), 1, 'loads 1 release');
      assert.equal(server.pretender.handledRequests.length, 1, 'handles 1 request');
      assert.equal(requestHeader(server, 'Authorization'), undefined, 'has no authorization token');
    });
  });
});

test('finding a release', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.create('github-release');

  return run(() => {
    return store.queryRecord('githubRelease', { repo: 'user1/repository0', releaseId: '1' }).then((release) => {
      assert.githubReleaseOk(release);
      assert.equal(store.peekAll('githubRelease').get('length'), 1, 'loads 1 release');
      assert.equal(server.pretender.handledRequests.length, 1, 'handles 1 request');
      assert.equal(requestHeader(server, 'Authorization'), 'token abc123', 'has the authorization token');
    });
  });
});

test('finding all releases', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  let repository = server.create('githubRepository');
  server.createList('github-release', 2, { repository });

  return run(() => {
    return store.query('githubRelease', { repo: 'user1/repository0' }).then((releases) => {
      assert.githubReleaseOk(releases.toArray()[0]);
      assert.equal(store.peekAll('githubRelease').get('length'), 2, 'loads 2 releases');
      assert.equal(server.pretender.handledRequests.length, 1, 'handles 1 request');
      assert.equal(requestHeader(server, 'Authorization'), 'token abc123', 'has the authorization token');
    });
  });
});

test('getting a releases\' author', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.create('github-release');

  return run(() => {
    return store.queryRecord('githubRelease', { repo: 'user1/repository0', releaseId: '1' }).then((release) => {
      return release.get('author').then(function (user) {
        assert.githubUserOk(user);
        assert.equal(store.peekAll('githubUser').get('length'), 1, 'loads 1 user');
        assert.equal(server.pretender.handledRequests.length, 1, 'handles 1 requests');
        assert.equal(requestHeader(server, 'Authorization'), 'token abc123', 'has the authorization token');
      });
    });
  });
});
