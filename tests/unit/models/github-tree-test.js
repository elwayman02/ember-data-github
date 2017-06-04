import { moduleForModel, test } from 'ember-qunit';

moduleForModel('github-tree', 'Unit | Model | github tree', {
  // Specify the other units that are required for this test.
  needs: ['model:github-blob']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
