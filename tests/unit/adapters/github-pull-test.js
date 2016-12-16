import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github-pull', 'Unit | Adapter | github pull', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});


test('it builds the index URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');

  assert.equal(adapter.buildURL('pulls'), `${host}/pulls`);
});

test('it builds the specific pull URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const id = 3;

  assert.equal(adapter.buildURL('pulls', id), `${host}/pulls/${id}`);
});
