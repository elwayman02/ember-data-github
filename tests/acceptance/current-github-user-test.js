/* global Factory */
import { run } from '@ember/runloop';

import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Pretender from 'pretender';

let server, container, store;

moduleForAcceptance('Acceptance | current github user', {
  beforeEach() {
    server = new Pretender();
    server.prepareBody = function (body) {
      return JSON.stringify(body);
    };
    container = this.application.__container__;
    store = run(container, 'lookup', 'service:store');
    container.lookup('service:github-session').set('githubAccessToken', 'abc123');
    server.get('/user', () => {
      return [200, {}, Factory.build('user')];
    });
  },

  afterEach() {
    server.shutdown();
  }
});

test('finding current user', function (assert) {
  return run(() => {
    return store.findRecord('githubUser', '#').then((user) => {
      assert.githubUserOk(user);
      assert.equal(store.peekAll('githubUser').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test(`finding current user's repositories`, function (assert) {
  server.get('/user/repos', () => {
    let response = [
      Factory.build('repository'),
      Factory.build('repository')
    ];
    return [200, {}, response];
  });

  return run(() => {
    return store.findRecord('githubUser', '#').then((user) => {
      return user.get('githubRepositories').then((repositories) => {
        assert.equal(repositories.get('length'), 2);
        assert.githubRepositoryOk(repositories.toArray()[0]);
        assert.equal(server.handledRequests.length, 2);
        assert.equal(server.handledRequests[1].requestHeaders.Authorization, 'token abc123');
      });
    });
  });
});
