import { moduleForModel, test } from 'ember-qunit';

moduleForModel('github-gist-file', 'Unit | Serializer | github gist file', {
  // Specify the other units that are required for this test.
  needs: ['serializer:github-gist-file']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
