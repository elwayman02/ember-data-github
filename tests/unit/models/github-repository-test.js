import { moduleForModel, test } from 'ember-qunit';

moduleForModel('github-repository', 'Unit | Model | github repository', {
  // Specify the other units that are required for this test.
  needs: [
    'model:githubUser',
    'model:githubBranch',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
