import { run } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let container, store;

moduleForAcceptance('Acceptance | github compare', {
  beforeEach() {
    container = this.application.__container__;
    store = run(container, 'lookup', 'service:store');
  }
});

test('finding a comparison without authorization', function (assert) {
  assert.expect(3);

  server.create('github-compare');

  return run(() => {
    return store.queryRecord('githubCompare', { repo: 'user1/repository1', base: '1234', 'head': '1234' }).then((compare) => {
      assert.githubCompareOk(compare);
      assert.equal(store.peekAll('githubCompare').get('length'), 1, 'loads 1 compare');
      assert.equal(requestHeader(server, 'Authorization'), undefined, 'has no authorization token');
    });
  });
});

test('finding a comparison', function (assert) {
  assert.expect(3);

  server.create('github-compare');
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.queryRecord('githubCompare', { repo: 'user1/repository1', base: '1234', 'head': '1234' }).then((compare) => {
      assert.githubCompareOk(compare);
      assert.equal(store.peekAll('githubCompare').get('length'), 1, 'loads 1 compare');
      assert.equal(requestHeader(server, 'Authorization'), 'token abc123');
    });
  });
});
