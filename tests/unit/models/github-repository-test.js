import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('github-repository', {
  // Specify the other units that are required for this test.
  needs: [
    'model:githubUser',
    'model:githubBranch'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
