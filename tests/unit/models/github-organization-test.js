import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('github-organization', {
  // Specify the other units that are required for this test.
  needs: [
    'model:githubRepository',
    'model:githubUser'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
