import { moduleForModel, test } from 'ember-qunit';

moduleForModel('github-organization', 'Unit | Serializer | github organization', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:github-organization',
    'model:githubRepository',
    'model:githubBranch',
    'model:githubUser',
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
