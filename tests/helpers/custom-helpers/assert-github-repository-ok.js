import Ember from 'ember';

export default Ember.Test.registerHelper(
  'assertGithubRepositoryOk',
  function(app, assert, repository) {
    assert.ok(repository.get('id'));
    assert.ok(repository.get('fullName'));
    assert.ok(repository.get('name'));
    assert.ok(repository.get('description'));
  }
);
