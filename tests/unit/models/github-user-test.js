import { moduleForModel, test } from 'ember-qunit';

moduleForModel('github-user', 'Unit | Model | github user', {
  // Specify the other units that are required for this test.
  needs: [
    'model:githubRepository',
    'model:githubBranch',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
