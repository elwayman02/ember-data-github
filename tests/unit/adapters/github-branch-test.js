import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github-branch', 'Unit | Adapter | github branch', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('it exists', function (assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it builds the specified branch URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const branch = 'jimmay5469/old-hash/branches/master';

  assert.equal(adapter.buildURL('github-branch', branch, null, 'findRecord'), `${host}/repos/${branch}`);
});

// TODO: The index URL doesn't work correctly
// TODO: This should probably be a query to avoid knowing too much about the path format like releases
