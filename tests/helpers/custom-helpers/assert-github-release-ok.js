import { registerHelper } from '@ember/test';
import QUnit from 'qunit';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubReleaseOk = assertionBuilder([
  'id',
  'url',
  'htmlUrl',
  'assetsUrl',
  'uploadUrl',
  'tarballUrl',
  'zipballUrl',
  'tagName',
  'targetCommitish',
  'name',
  'body',
  'draft',
  'prerelease',
  'createdAt',
  'publishedAt'
]);

export default registerHelper(
  'assertGithubReleaseOk',
  function (app, assert, release) {
    assert.githubReleaseOk(release);
  }
);
