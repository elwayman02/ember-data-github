import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github', 'Unit | Adapter | github', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
  needs: ['service:github-session']
});

test('it exists and has the right properties', function (assert) {
  let adapter = this.subject();
  assert.ok(adapter);
  assert.ok(adapter.get('host'));
  assert.ok(adapter.get('session'));
  assert.ok(adapter.get('headers'));
});

test('it computes headers without authorization correctly', function(assert) {
  let adapter = this.subject();
  let session = adapter.get('session');

  assert.ok(session);
  assert.notOk(session.get('githubAccessToken'));
  assert.deepEqual(adapter.get('headers'), {});
});

test('it computes headers with authorization correctly', function(assert) {
  let adapter = this.subject();
  let session = adapter.get('session');
  const token = 'asdfjkl';

  session.set('githubAccessToken', token);

  assert.deepEqual(adapter.get('headers'), { Authorization: `token ${token}`});
});

test('it transforms type names correctly', function(assert) {
  let adapter = this.subject();

  assert.equal(adapter.pathForType('github-user'), 'users');
  assert.equal(adapter.pathForType('github-user-name'), 'userNames');
});
