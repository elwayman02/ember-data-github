import { run } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let container, store;

moduleForAcceptance('Acceptance | github repository contents', {
  beforeEach() {
    container = this.application.__container__;
    store = run(container, 'lookup', 'service:store');
  }
});

test('retrieving github repository contents', function(assert) {
  assert.expect(4);

  server.create('githubRepositoryContents', { name: 'app.json' });

  return run(() => {
    return store.queryRecord('github-repository-contents', {
      repo: 'jmar910/test-repo-yay',
      file: 'app.json'
    }).then((content) => {
      assert.githubRepositoryContentsOk(content);
      assert.equal(store.peekAll('githubRepositoryContents').get('length'), 1, 'loads 1 repository contents');
      assert.equal(server.pretender.handledRequests.length, 1);
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});
