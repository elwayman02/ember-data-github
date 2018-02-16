import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github-repository', 'Unit | Adapter | github repository', {
  needs: ['service:github-session']
});

test('it exists', function (assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it builds the index URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');

  assert.equal(adapter.buildURL('github-repository', null, null), `${host}/repositories`);
});

test('it builds the specified repo name URL correctly', function(assert) {
  let adapter = this.subject();
  let host = adapter.get('host');
  let name = 'elwayman02/ember-data-github';

  assert.equal(adapter.buildURL('github-repository', name, null, 'findRecord'), `${host}/repos/${name}`);
});


test('it builds the specified repo list URL correctly', function(assert) {
  let adapter = this.subject();
  let host = adapter.get('host');
  let user = 'elwayman02';

  assert.equal(adapter.buildURL('github-repository', null, null, 'query', { user }), `${host}/users/${user}/repos`);
});

test('it builds the specified repo id URL correctly', function(assert) {
  let adapter = this.subject();
  let host = adapter.get('host');
  let id = 34598603;

  assert.equal(adapter.buildURL('github-repository', parseInt(id), null, 'findRecord'), `${host}/repositories/${id}`);
  assert.equal(adapter.buildURL('github-repository', id.toString(), null, 'findRecord'), `${host}/repositories/${id}`);
});
