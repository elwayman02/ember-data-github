import { registerHelper } from '@ember/test';
import QUnit from 'qunit';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubBranchOk = assertionBuilder([
  'id',
  'name'
]);

export default registerHelper(
  'assertGithubBranchOk',
  function (app, assert, branch) {
    assert.githubBranchOk(branch);
  }
);
