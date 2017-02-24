/* global Factory */
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from 'dummy/tests/helpers/start-app';
import Pretender from 'pretender';
import Ember from 'ember';

const { run } = Ember;

let server, app, container, store;

moduleForAcceptance('Acceptance | github release', {
  beforeEach() {
    server = new Pretender();
    server.prepareBody = function (body) {
      return JSON.stringify(body);
    };
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

test('finding a release without authorization', function (assert) {
  assert.expect(18);

  server.get('/repos/user1/repository1/releases/1', () => {
    return [200, {}, Factory.build('release')];
  });

  return run(() => {
    return store.queryRecord('githubRelease', { repo: 'user1/repository1', releaseId: '1' }).then((release) => {
      assertGithubReleaseOk(assert, release);
      assert.equal(store.peekAll('githubRelease').get('length'), 1, 'loads 1 release');
      assert.equal(server.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined, 'has no authorization token');
    });
  });
});

test('finding a release', function (assert) {
  assert.expect(18);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/repos/user1/repository1/releases/1', () => {
    return [200, {}, Factory.build('release')];
  });

  return run(() => {
    return store.queryRecord('githubRelease', { repo: 'user1/repository1', releaseId: '1' }).then((release) => {
      assertGithubReleaseOk(assert, release);
      assert.equal(store.peekAll('githubRelease').get('length'), 1, 'loads 1 release');
      assert.equal(server.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});

test('finding all releases', function (assert) {
  assert.expect(18);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/repos/user1/repository1/releases', () => {
    return [200, {},
      [
        Factory.build('release'),
        Factory.build('release')
      ]
    ];
  });

  return run(() => {
    return store.query('githubRelease', { repo: 'user1/repository1' }).then((releases) => {
      assertGithubReleaseOk(assert, releases.toArray()[0]);
      assert.equal(store.peekAll('githubRelease').get('length'), 2, 'loads 2 releases');
      assert.equal(server.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});

test('getting a releases\' author', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/repos/user1/repository1/releases/1', () => {
    return [200, {}, Factory.build('release')];
  });
  server.get('/users/user1', () => {
    return [200, {}, Factory.build('user')];
  });

  return run(() => {
    return store.queryRecord('githubRelease', { repo: 'user1/repository1', releaseId: '1' }).then((release) => {
      return release.get('user').then(function (user) {
        assert.githubUserOk(user);
        assert.equal(store.peekAll('githubUser').get('length'), 1, 'loads 1 user');
        assert.equal(server.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});
