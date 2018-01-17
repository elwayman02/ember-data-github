/* global Factory */
import { run } from '@ember/runloop';

import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Pretender from 'pretender';

let server, container, store;

moduleForAcceptance('Acceptance | github blob', {
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

test('retrieving a blob', function(assert) {
  server.get('/repos/user1/repo1/git/blobs/1', () => {
    return [200, {}, Factory.build('blob')];
  });

  return run(() => {
    return store.queryRecord('github-blob', {
      repo: 'user1/repo1',
      sha: '1'
    }).then(blob => {
      assert.githubBlobOk(blob);
      assert.equal(store.peekAll('githubBlob').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});
