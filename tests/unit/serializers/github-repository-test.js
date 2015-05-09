import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('github-repository', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:github-repository',
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
