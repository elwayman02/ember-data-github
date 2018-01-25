/* global Factory */
import { run } from '@ember/runloop';

import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Pretender from 'pretender';

let server, container, store;

moduleForAcceptance('Acceptance | github repository', {
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

test('finding a repository without authorization', function (assert) {
  assert.expect(4);

  server.get('/repos/User1/Repository1', () => {
    return [200, {}, Factory.build('repository')];
  });

  return run(() => {
    return store.findRecord('githubRepository', 'User1/Repository1').then((repository) => {
      assert.githubRepositoryOk(repository);
      assert.equal(store.peekAll('githubRepository').get('length'), 1, 'loads 1 repository');
      assert.equal(server.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined, 'has no authorization token');
    });
  });
});

test('finding a repository by name', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/repos/user1/repository1', () => {
    return [200, {}, Factory.build('repository')];
  });

  return run(() => {
    return store.findRecord('githubRepository', 'user1/repository1').then((repository) => {
      assert.githubRepositoryOk(repository);
      assert.equal(store.peekAll('githubRepository').get('length'), 1, 'loads 1 repository');
      assert.equal(server.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});

test('finding a repository by id', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/repositories/1', () => {
    return [200, {}, Factory.build('repository')];
  });

  return run(() => {
    return store.findRecord('githubRepository', 1).then((repository) => {
      assert.githubRepositoryOk(repository);
      assert.equal(store.peekAll('githubRepository').get('length'), 1, 'loads 1 repository');
      assert.equal(server.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});


test('finding all repositories', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/repositories', () => {
    let response = [
      Factory.build('repository'),
      Factory.build('repository')
    ];
    return [200, {}, response];
  });

  return run(() => {
    return store.findAll('githubRepository').then(function (repositories) {
      assert.equal(repositories.get('length'), 2, 'loads 2 repositories');
      assert.githubRepositoryOk(repositories.toArray()[0]);
      assert.equal(server.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});

test('getting a repository\'s owner', function (assert) {
  assert.expect(3);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/repos/user1/repository1', () => {
    return [200, {}, Factory.build('repository')];
  });
  server.get('/users/user1', () => {
    return [200, {}, Factory.build('user')];
  });

  return run(() => {
    return store.findRecord('githubRepository', 'user1/repository1').then((repository) => {
      return repository.get('owner').then(function (owner) {
        assert.githubUserOk(owner);
        assert.equal(server.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});

test('getting a repository\'s default branch', function (assert) {
  assert.expect(3);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/repos/user1/repository1', () => {
    return [200, {}, Factory.build('repository')];
  });
  server.get('/repos/user1/repository1/branches/branch1', () => {
    return [200, {}, Factory.build('branch')];
  });

  return run(() => {
    return store.findRecord('githubRepository', 'user1/repository1').then((repository) => {
      return repository.get('defaultBranch').then(function (branch) {
        assert.githubBranchOk(branch);
        assert.equal(server.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});

test('finding a repository\'s branches', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/repos/user1/repository1', () => {
    return [200, {}, Factory.build('repository')];
  });
  server.get('/repos/user1/repository1/branches', () => {
    let response = [
      Factory.build('branch'),
      Factory.build('branch')
    ];
    return [200, {}, response];
  });

  return run(() => {
    return store.findRecord('githubRepository', 'user1/repository1').then((repository) => {
      return repository.get('branches').then(function (branches) {
        assert.equal(branches.get('length'), 2, 'loads 2 branches');
        assert.githubBranchOk(branches.toArray()[0]);
        assert.equal(server.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.handledRequests[1].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});


test('finding a repository\'s releases', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/repos/user1/repository1', () => {
    return [200, {}, Factory.build('repository')];
  });
  server.get('/repos/user1/repository1/releases', () => {
    let response = [
      Factory.build('release'),
      Factory.build('release')
    ];
    return [200, {}, response];
  });

  return run(() => {
    return store.findRecord('githubRepository', 'user1/repository1').then((repository) => {
      return repository.get('releases').then(function (releases) {
        assert.equal(releases.get('length'), 2, 'loads 2 releases');
        assert.githubReleaseOk(releases.toArray()[0]);
        assert.equal(server.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.handledRequests[1].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});
