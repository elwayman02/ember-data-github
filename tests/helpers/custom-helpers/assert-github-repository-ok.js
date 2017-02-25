import QUnit from 'qunit';
import Ember from 'ember';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubRepositoryOk = assertionBuilder([
  'id',
  'fullName',
  'name',
  'description',
  'fork',
  'private',
  'createdAt',
  'updatedAt',
  'pushedAt'
]);

export default Ember.Test.registerHelper(
  'assertGithubRepositoryOk',
  function (app, assert, repository) {
    assert.githubRepositoryOk(repository);
  }
);
