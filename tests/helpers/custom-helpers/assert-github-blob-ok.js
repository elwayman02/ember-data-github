import QUnit from 'qunit';
import Ember from 'ember';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubBlobOk = assertionBuilder([
  'id',
  'sha',
  'url',
  'content',
  'size',
  'encoding'
]);

export default Ember.Test.registerHelper(
  'assertGithubBlobOk',
  function (app, assert, blob) {
    assert.githubBlobOk(blob);
  }
);
