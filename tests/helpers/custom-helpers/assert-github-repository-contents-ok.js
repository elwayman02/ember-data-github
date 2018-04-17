import { registerHelper } from '@ember/test';
import QUnit from 'qunit';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubRepositoryContentsOk = assertionBuilder([
  'id',
  'content',
  'downloadUrl',
  'encoding',
  'gitUrl',
  'htmlUrl',
  'name',
  'path',
  'sha',
  'size',
  'type',
  'url'
]);

export default registerHelper(
  'assertGithubRepositoryContentsOk',
  function (app, assert, contents) {
    assert.githubRepositoryContentsOk(contents);
  }
);
