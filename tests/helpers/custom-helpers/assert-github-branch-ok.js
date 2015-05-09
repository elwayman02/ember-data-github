import Ember from 'ember';

export default Ember.Test.registerHelper(
  'assertGithubBranchOk',
  function(app, assert, repository) {
    assert.ok(repository.get('id'));
    assert.ok(repository.get('name'));
  }
);
