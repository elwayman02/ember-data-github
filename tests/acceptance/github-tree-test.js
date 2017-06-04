/* global Factory */
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from 'dummy/tests/helpers/start-app';
import Pretender from 'pretender';
import Ember from 'ember';

const { run } = Ember;

let server, app, container, store;

moduleForAcceptance('Acceptance | github tree', {
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
