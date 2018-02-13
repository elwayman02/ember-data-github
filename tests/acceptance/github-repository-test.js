import { run } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let container, store;

moduleForAcceptance('Acceptance | github repository', {
  beforeEach() {
    container = this.application.__container__;
    store = run(container, 'lookup', 'service:store');
    let owner = server.create('github-user');
    server.create('github-repository', { owner }, 'withBranches');
  }
});

test('finding a repository without authorization', function (assert) {
  assert.expect(4);

  return run(() => {
    return store.findRecord('githubRepository', 'user0/repository0').then((repository) => {
      assert.githubRepositoryOk(repository);
      assert.equal(store.peekAll('githubRepository').get('length'), 1, 'loads 1 repository');
      assert.equal(server.pretender.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, undefined, 'has no authorization token');
    });
  });
});

test('finding a repository by name', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findRecord('githubRepository', 'user0/repository0').then((repository) => {
      assert.githubRepositoryOk(repository);
      assert.equal(store.peekAll('githubRepository').get('length'), 1, 'loads 1 repository');
      assert.equal(server.pretender.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});

test('finding a repository by id', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findRecord('githubRepository', 1).then((repository) => {
      assert.githubRepositoryOk(repository);
      assert.equal(store.peekAll('githubRepository').get('length'), 1, 'loads 1 repository');
      assert.equal(server.pretender.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});


test('finding all repositories', function (assert) {
  assert.expect(4);

  let owner = server.create('github-user');
  server.create('github-repository', { owner });
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findAll('githubRepository').then(function (repositories) {
      assert.equal(repositories.get('length'), 2, 'loads 2 repositories');
      assert.githubRepositoryOk(repositories.toArray()[0]);
      assert.equal(server.pretender.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});

test('getting a repository\'s owner', function (assert) {
  assert.expect(3);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findRecord('githubRepository', 'user0/repository0').then((repository) => {
      return repository.get('owner').then(function (owner) {
        assert.githubUserOk(owner);
        assert.equal(server.pretender.handledRequests.length, 1, 'handles 1 request1');
        assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});

test('getting a repository\'s default branch', function (assert) {
  assert.expect(3);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findRecord('githubRepository', 'user0/repository0').then((repository) => {
      return repository.get('defaultBranch').then(function (branch) {
        assert.githubBranchOk(branch);
        assert.equal(server.pretender.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});

test('finding a repository\'s branches', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findRecord('githubRepository', 'user0/repository0').then((repository) => {
      return repository.get('branches').then(function (branches) {
        assert.equal(branches.get('length'), 2, 'loads 2 branches');
        assert.githubBranchOk(branches.toArray()[0]);
        assert.equal(server.pretender.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.pretender.handledRequests[1].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});

test('finding a repository\'s releases', function (assert) {
  assert.expect(4);

  let owner = server.create('github-user');
  server.create('github-repository', { owner }, 'withReleases');
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findRecord('githubRepository', 'user1/repository1').then((repository) => {
      return repository.get('releases').then(function (releases) {
        assert.equal(releases.get('length'), 2, 'loads 2 releases');
        assert.githubReleaseOk(releases.toArray()[0]);
        assert.equal(server.pretender.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.pretender.handledRequests[1].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});

test('finding a repository\'s pull requests', function (assert) {
  assert.expect(4);

  let owner = server.create('github-user');
  server.create('github-repository', { owner }, 'withPulls');
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findRecord('githubRepository', 'user1/repository1').then((repository) => {
      return repository.get('pulls').then(function (pulls) {
        assert.equal(pulls.get('length'), 2, 'loads 2 pull requests');
        assert.githubPullOk(pulls.toArray()[0]);
        assert.equal(server.pretender.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.pretender.handledRequests[1].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});
