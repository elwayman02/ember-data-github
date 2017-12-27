/* global Factory */
import { run } from '@ember/runloop';

import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Pretender from 'pretender';

let server, container, store;

moduleForAcceptance('Acceptance | github tree', {
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

test('retrieving a tree', function(assert) {
  server.get('/repos/user1/repo1/git/trees/1', () => {
    return [200, {}, Factory.build('tree')];
  });

  return run(() => {
    return store.queryRecord('github-tree', {
      repo: 'user1/repo1',
      sha: '1'
    }).then(tree => {
      assert.githubTreeOk(tree);
      assert.equal(store.peekAll('githubTree').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});

test('retrieving a tree recursively', function(assert) {
  server.get('/repos/user1/repo1/git/trees/1', () => {
    return [200, {}, Factory.build('tree')];
  });

  return run(() => {
    return store.queryRecord('github-tree', {
      repo: 'user1/repo1',
      sha: '1',
      recursive: true
    }).then(tree => {
      assert.githubTreeOk(tree);
      assert.equal(store.peekAll('githubTree').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
      assert.ok(server.handledRequests[0].queryParams);
      assert.ok(server.handledRequests[0].queryParams.recursive);
      assert.equal(server.handledRequests[0].queryParams.recursive, 1);
    });
  });
});
