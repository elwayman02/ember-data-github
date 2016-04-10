import { moduleForModel, test } from 'ember-qunit';

moduleForModel('github-organization', 'Unit | Model | github organization', {
  // Specify the other units that are required for this test.
  needs: [
    'model:githubRepository',
    'model:githubBranch',
    'model:githubUser'
  ]
});

test('it exists', function (assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
