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
  const login = 'elwayman02';

  assert.equal(adapter.buildURL('github-user', login, null, 'findRecord'), `${host}/users/${login}`);
});

test('it builds specified user id URLs correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const id = 917672;

  assert.equal(adapter.buildURL('github-user', parseInt(id), null, 'findRecord'), `${host}/user/${id}`);
  assert.equal(adapter.buildURL('github-user', id.toString(), null, 'findRecord'), `${host}/user/${id}`);
});
