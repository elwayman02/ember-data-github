import { registerHelper } from '@ember/test';
import QUnit from 'qunit';
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

export default registerHelper(
  'assertGithubUserOk',
  function (app, assert, user) {
    assert.githubUserOk(user);
  }
);
