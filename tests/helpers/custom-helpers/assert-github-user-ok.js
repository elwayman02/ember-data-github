import Ember from 'ember';

export default Ember.Test.registerHelper(
  'assertGithubUserOk',
  function(app, assert, user) {
    assert.ok(user.get('id'));
    assert.ok(user.get('name'));
    assert.ok(user.get('avatarUrl'));
  }
);
