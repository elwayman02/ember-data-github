import { moduleForModel, test } from 'ember-qunit';

moduleForModel('github-compare', 'Unit | Serializer | github compare', {
  needs: ['serializer:github-compare', 'model:github-commit', 'model:github-file']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
