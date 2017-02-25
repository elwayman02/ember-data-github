/* global Factory */
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from 'dummy/tests/helpers/start-app';
import Pretender from 'pretender';
import Ember from 'ember';

const { run } = Ember;

let server, app, container, store;

moduleForAcceptance('Acceptance | github branch', {
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

test('finding a branch without authorization', function (assert) {
  server.get('/repos/User1/Repository1/branches/Branch1', () => {
    return [200, {}, Factory.build('branch')];
  });

  return run(() => {
    return store.findRecord('githubBranch', 'User1/Repository1/branches/Branch1').then((branch) => {
      assert.githubBranchOk(branch);
      assert.equal(store.peekAll('githubBranch').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});

test('finding a branch', function (assert) {
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/repos/user1/repository1/branches/branch1', () => {
    return [200, {}, Factory.build('branch')];
  });

  return run(() => {
    return store.findRecord('githubBranch', 'user1/repository1/branches/branch1').then((branch) => {
      assert.githubBranchOk(branch);
      assert.equal(store.peekAll('githubBranch').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

