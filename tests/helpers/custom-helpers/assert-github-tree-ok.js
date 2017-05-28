import Ember from 'ember';

export default Ember.Test.registerHelper(
  'assertGithubTreeOk',
  function (app, assert, tree) {
    assert.ok(tree.get('sha'));
    assert.ok(tree.get('url'));
    assert.ok(tree.get('tree'));
    assert.ok(tree.get('truncated'));
  }
);
