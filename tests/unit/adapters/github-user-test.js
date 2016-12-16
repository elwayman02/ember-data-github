import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github-user', 'Unit | Adapter | github user', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('it exists', function (assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it builds the current user URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');

  assert.equal(adapter.buildURL('github-user', '#', null), `${host}/user`);
});

test('it builds specified user URLs correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const user = 'elwayman02';

  assert.equal(adapter.buildURL('github-user', user, null), `${host}/users/${user}`);
});
