import { run } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let container, store;

moduleForAcceptance('Acceptance | github blob', {
  beforeEach() {
    container = this.application.__container__;
    store = run(container, 'lookup', 'service:store');
  }
});

test('retrieving a blob', function(assert) {
  assert.expect(4);

  server.create('github-blob');

  return run(() => {
    return store.queryRecord('github-blob', {
      repo: 'user1/repo1',
      sha: '1'
    }).then(blob => {
      assert.githubBlobOk(blob);
      assert.equal(store.peekAll('githubBlob').get('length'), 1);
      assert.equal(server.pretender.handledRequests.length, 1);
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});
