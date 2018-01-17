/* global Factory */
import { run } from '@ember/runloop';

import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Pretender from 'pretender';

let server, container, store;

moduleForAcceptance('Acceptance | github branch', {
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
