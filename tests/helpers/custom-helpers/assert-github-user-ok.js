import QUnit from 'qunit';
import Ember from 'ember';

QUnit.assert.githubUserOk = function(user, message) {
  let allDefined = true;
  let undefinedKeys = [];
  [
    'id',
    'login',
    'name',
    'type',
    'avatarUrl',
    'publicRepos',
    'publicGists',
    'followers',
    'following',
    'createdAt',
    'updatedAt',
    'url'
  ].forEach(key => {
    if( user.get(key) === undefined ) {
      allDefined = false;
      undefinedKeys.push(key);
    }
  });
  this.pushResult({
    result: allDefined,
    actual: allDefined,
    expected: true,
    message: `${message}: ${undefinedKeys.join(',')}`
  });
};

export default Ember.Test.registerHelper(
  'assertGithubUserOk',
  function (app, assert, user) {
    assert.githubUserOk(user);
  }
);
