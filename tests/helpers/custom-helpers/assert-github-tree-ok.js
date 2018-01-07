import { registerHelper } from '@ember/test';
import QUnit from 'qunit';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubTreeOk = assertionBuilder([
  'id',
  'sha',
  'url',
  'files',
  'directories',
  'blobs',
  'trees',
  'truncated'
]);

export default registerHelper(
  'assertGithubTreeOk',
  function (app, assert, tree) {
    assert.githubTreeOk(tree);
  }
);
