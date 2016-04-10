import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from 'dummy/tests/helpers/start-app';
import Pretender from 'pretender';
import Ember from 'ember';

const { run } = Ember;

let server, app, container, store;

moduleForAcceptance('Acceptance | current github user', {
  beforeEach() {
    server = new Pretender();
    server.prepareBody = function(body){ return JSON.stringify(body); };
    app = startApp();
    container = app.__container__;
    store = run(container, 'lookup', 'service:store');
  },

  afterEach() {
    run(app, app.destroy);
    Ember.BOOTED = false;
  }
});


test('finding current user', function(assert) {
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');
  server.get('/user', () => {
    return [200, {}, Factory.build('user')];
  });

  return run(() => {
    return store.findRecord('githubUser', '#').then((user) => {
      assertGithubUserOk(assert, user);
      assert.equal(store.all('githubUser').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});
