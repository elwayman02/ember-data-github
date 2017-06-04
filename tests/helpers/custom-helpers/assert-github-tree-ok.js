import QUnit from 'qunit';
import Ember from 'ember';
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

export default Ember.Test.registerHelper(
  'assertGithubTreeOk',
  function (app, assert, tree) {
    assert.githubTreeOk(tree);
  }
);
