import QUnit from 'qunit';
import Ember from 'ember';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubBranchOk = assertionBuilder([
  'id',
  'name'
]);

export default Ember.Test.registerHelper(
  'assertGithubBranchOk',
  function (app, assert, branch) {
    assert.githubBranchOk(branch);
  }
);
