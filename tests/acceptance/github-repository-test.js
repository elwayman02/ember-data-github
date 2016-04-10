import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from 'dummy/tests/helpers/start-app';
import Pretender from 'pretender';
import Ember from 'ember';

const { run } = Ember;

let server, app, container, store;

moduleForAcceptance('Acceptance | github repository', {
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

test('finding a repository without authorization', function (assert) {
  server.get('/repos/User1/Repository1', () => {
    return [200, {}, Factory.build('repository')];
  });

  return run(() => {
    return store.findRecord('githubRepository', 'User1/Repository1').then((repository) => {
      assertGithubRepositoryOk(assert, repository);
      assert.equal(store.peekAll('githubRepository').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});

test('finding a repository', function (assert) {
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/repos/user1/repository1', () => {
    return [200, {}, Factory.build('repository')];
  });

  return run(() => {
    return store.findRecord('githubRepository', 'user1/repository1').then((repository) => {
      assertGithubRepositoryOk(assert, repository);
      assert.equal(store.peekAll('githubRepository').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test('finding all repositories', function (assert) {
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
      assert.equal(repositories.get('length'), 2);
      assertGithubRepositoryOk(assert, repositories.toArray()[0]);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test('getting a repository\'s owner', function (assert) {
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
        assertGithubUserOk(assert, owner);
        assert.equal(server.handledRequests.length, 2);
        assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
      });
    });
  });
});

test('getting a repository\'s default branch', function (assert) {
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
        assertGithubBranchOk(assert, branch);
        assert.equal(server.handledRequests.length, 2);
        assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
      });
    });
  });
});

test('finding a repository\'s branches', function (assert) {
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
        assert.equal(branches.get('length'), 2);
        assertGithubBranchOk(assert, branches.toArray()[0]);
        assert.equal(server.handledRequests.length, 2);
        assert.equal(server.handledRequests[1].requestHeaders.Authorization, 'token abc123');
      });
    });
  });
});

