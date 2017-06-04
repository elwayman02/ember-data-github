import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github-tree', 'Unit | Adapter | github tree', {
});

test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it builds the URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const repo = 'jimmay5469/old-hash';
  const sha = '219985c2289f78f0a652c317ec69c2bc355ee5e9';
  let query = {
    repo,
    sha
  };

  assert.equal(adapter.buildURL('github-blob', null, null, 'queryRecord', query), `${host}/repos/${repo}/git/trees/${sha}`);
});
