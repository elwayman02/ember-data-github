import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github-organization', 'Unit | Adapter | github organization', {
  needs: ['service:github-session']
});

test('it exists', function (assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it builds the index URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');

  assert.equal(adapter.buildURL('organizations', null, null), `${host}/orgs`);
});

test('it builds the specified org URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const org = 'ember';

  assert.equal(adapter.buildURL('organizations', org, null), `${host}/orgs/${org}`);
});
