import { run } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let container, store;

moduleForAcceptance('Acceptance | github tree', {
  beforeEach() {
    container = this.application.__container__;
    store = run(container, 'lookup', 'service:store');
  }
});

test('retrieving a tree', function(assert) {
  assert.expect(4);

  server.create('githubTree');

  return run(() => {
    return store.queryRecord('github-tree', {
      repo: 'user1/repo1',
      sha: '1'
    }).then(tree => {
      assert.githubTreeOk(tree);
      assert.equal(store.peekAll('githubTree').get('length'), 1);
      assert.equal(server.pretender.handledRequests.length, 1);
      assert.equal(requestHeader(server, 'Authorization'), undefined);
    });
  });
});

test('retrieving a tree recursively', function(assert) {
  assert.expect(7);
  
  server.create('githubTree');

  return run(() => {
    return store.queryRecord('github-tree', {
      repo: 'user1/repo1',
      sha: '1',
      recursive: true
    }).then(tree => {
      assert.githubTreeOk(tree);
      assert.equal(store.peekAll('githubTree').get('length'), 1);
      assert.equal(server.pretender.handledRequests.length, 1);
      assert.equal(requestHeader(server, 'Authorization'), undefined);
      assert.ok(server.pretender.handledRequests[0].queryParams);
      assert.ok(server.pretender.handledRequests[0].queryParams.recursive);
      assert.equal(server.pretender.handledRequests[0].queryParams.recursive, 1);
    });
  });
});
