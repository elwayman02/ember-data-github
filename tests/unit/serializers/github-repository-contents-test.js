import { moduleForModel, test } from 'ember-qunit';

moduleForModel('github-repository-contents', 'Unit | Serializer | github repository contents', {
  // Specify the other units that are required for this test.
  needs: ['serializer:github-repository-contents']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
