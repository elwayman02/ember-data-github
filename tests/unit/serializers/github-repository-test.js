import { moduleForModel, test } from 'ember-qunit';

moduleForModel('github-repository', 'Unit | Serializer | github repository', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:github-repository',
    'model:githubBranch',
    'model:githubUser',
    'model:githubPull',
    'model:githubRelease'
  ]
});

// Replace this with your real tests.
test('it serializes records', function (assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
