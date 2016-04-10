import Ember from 'ember';

export default Ember.Test.registerHelper(
  'assertGithubOrganizationOk',
  function (app, assert, user) {
    assert.ok(user.get('id'));
    assert.ok(user.get('login'));
    assert.ok(user.get('name'));
    assert.ok(user.get('avatarUrl'));
  }
);
