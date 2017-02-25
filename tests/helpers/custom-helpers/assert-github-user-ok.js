import QUnit from 'qunit';
import Ember from 'ember';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubUserOk = assertionBuilder([
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
]);

export default Ember.Test.registerHelper(
  'assertGithubUserOk',
  function (app, assert, user) {
    assert.githubUserOk(user);
  }
);
