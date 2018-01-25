import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github-user', 'Unit | Adapter | github user', {
  needs: ['service:github-session']
});

test('it exists', function (assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it builds the current user URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');

  assert.equal(adapter.buildURL('github-user', '#', null, 'findRecord'), `${host}/user`);
});

test('it builds specified user login URLs correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const user = 'elwayman02';

  assert.equal(adapter.buildURL('github-user', user, null, 'findRecord'), `${host}/users/${user}`);
});

test('it builds specified user id URLs correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const user = 917672;

  assert.equal(adapter.buildURL('github-user', user, null, 'findRecord'), `${host}/user/${user}`);
});
