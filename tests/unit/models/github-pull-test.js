import { moduleForModel, test } from 'ember-qunit';

moduleForModel('github-pull', 'Unit | Model | github pull', {
  // Specify the other units that are required for this test.
  needs: [
    'model:githubUser',
    'model:githubBranch'
  ]
});

test('it exists', function (assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
