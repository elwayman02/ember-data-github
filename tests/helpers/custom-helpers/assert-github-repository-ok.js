import Ember from 'ember';

export default Ember.Test.registerHelper(
  'assertGithubRepositoryOk',
  function(app, assert, repository) {
    assert.ok(repository.get('id'));
    assert.ok(repository.get('fullName'));
    assert.ok(repository.get('name'));
    assert.ok(repository.get('description'));
    assert.ok(repository.get('fork'));
    assert.ok(repository.get('private'));
    assert.ok(repository.get('createdAt'));
    assert.ok(repository.get('updatedAt'));
    assert.ok(repository.get('pushedAt'));
  }
);
