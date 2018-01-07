import { registerHelper } from '@ember/test';
import QUnit from 'qunit';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubBlobOk = assertionBuilder([
  'id',
  'sha',
  'url',
  'content',
  'size',
  'encoding'
]);

export default registerHelper(
  'assertGithubBlobOk',
  function (app, assert, blob) {
    assert.githubBlobOk(blob);
  }
);
