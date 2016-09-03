import { moduleForModel, test } from 'ember-qunit';

moduleForModel('github-release', 'Unit | Serializer | github release', {
  // Specify the other units that are required for this test.
  needs: ['serializer:github-release']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
