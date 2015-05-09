import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('github-organization', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:github-organization',
    'model:githubRepository',
    'model:githubBranch',
    'model:githubUser'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  var record = this.subject();

  var serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
