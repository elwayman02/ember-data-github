import { registerHelper } from '@ember/test';
import QUnit from 'qunit';
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

export default registerHelper(
  'assertGithubRepositoryOk',
  function (app, assert, repository) {
    assert.githubRepositoryOk(repository);
  }
);
