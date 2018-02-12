import { registerHelper } from '@ember/test';
import QUnit from 'qunit';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubCompareOk = assertionBuilder([
  'id',
  'aheadBy',
  'behindBy',
  'status',
  'totalCommits',
  'diffUrl',
  'htmlUrl',
  'patchUrl',
  'permalinkUrl',
  'baseCommit',
  'mergeBaseCommit'
]);

export default registerHelper(
  'githubCompareOk',
  function (app, assert, compare) {
    assert.githubCompareOk(compare);
  }
);
