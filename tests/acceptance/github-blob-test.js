/* global Factory */
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from 'dummy/tests/helpers/start-app';
import Pretender from 'pretender';
import Ember from 'ember';

const { run } = Ember;

let server, app, container, store;

moduleForAcceptance('Acceptance | github blob', {
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
