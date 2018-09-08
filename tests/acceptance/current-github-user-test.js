import { run } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let container, store;

moduleForAcceptance('Acceptance | current github user', {
  beforeEach() {
    container = this.application.__container__;
    store = run(container, 'lookup', 'service:store');
    container.lookup('service:github-session').set('githubAccessToken', 'abc123');
    server.create('github-user', 'withRepositories')
  }
});

test('finding current user', function (assert) {
  assert.expect(4);

  return run(() => {
    return store.findRecord('githubUser', '#').then((user) => {
      assert.githubUserOk(user);
      assert.equal(store.peekAll('githubUser').get('length'), 1);
      assert.equal(server.pretender.handledRequests.length, 1);
      assert.equal(requestHeader(server, 'Authorization'), 'token abc123');
    });
  });
});

test(`finding current user's repositories`, function (assert) {
  assert.expect(4);

  return run(() => {
    return store.findRecord('githubUser', '#').then((user) => {
      return user.get('repositories').then((repositories) => {
        assert.equal(repositories.get('length'), 2);
        assert.githubRepositoryOk(repositories.toArray()[0]);
        assert.equal(server.pretender.handledRequests.length, 2);
        assert.equal(requestHeader(server, 'Authorization', 1), 'token abc123');
      });
    });
  });
});
