import { moduleForModel, test } from 'ember-qunit';

moduleForModel('github-release', 'Unit | Model | github release', {
  // Specify the other units that are required for this test.
  needs: ['model:github-user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
