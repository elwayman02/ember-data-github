import { run } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let container, store;

moduleForAcceptance('Acceptance | github branch', {
  beforeEach() {
    container = this.application.__container__;
    store = run(container, 'lookup', 'service:store');
    server.create('github-branch')
  }
});

test('finding a branch without authorization', function (assert) {
  assert.expect(4);

  return run(() => {
    return store.findRecord('githubBranch', 'User1/Repository1/branches/branch0').then((branch) => {
      assert.githubBranchOk(branch);
      assert.equal(store.peekAll('githubBranch').get('length'), 1);
      assert.equal(server.pretender.handledRequests.length, 1);
      assert.equal(requestHeader(server, 'Authorization'), undefined);
    });
  });
});

test('finding a branch', function (assert) {
  assert.expect(4);

  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findRecord('githubBranch', 'user1/repository1/branches/branch0').then((branch) => {
      assert.githubBranchOk(branch);
      assert.equal(store.peekAll('githubBranch').get('length'), 1);
      assert.equal(server.pretender.handledRequests.length, 1);
      assert.equal(requestHeader(server, 'Authorization'), 'token abc123');
    });
  });
});
