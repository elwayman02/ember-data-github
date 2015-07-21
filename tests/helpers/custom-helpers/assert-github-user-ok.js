import Ember from 'ember';

export default Ember.Test.registerHelper(
  'assertGithubUserOk',
  function(app, assert, user) {
    assert.ok(user.get('id'));
    assert.ok(user.get('login'));
    assert.ok(user.get('name'));
    assert.ok(user.get('type'));
    assert.ok(user.get('avatarUrl'));
    assert.ok(user.get('publicRepos'));
    assert.ok(user.get('publicGists'));
    assert.ok(user.get('followers'));
    assert.ok(user.get('following'));
    assert.ok(user.get('createdAt'));
    assert.ok(user.get('updatedAt'));
  }
);
