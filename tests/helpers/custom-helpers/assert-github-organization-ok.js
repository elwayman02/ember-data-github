import { registerHelper } from '@ember/test';
import QUnit from 'qunit';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubOrganizationOk = assertionBuilder([
  'id',
  'login',
  'name',
  'avatarUrl'
]);

export default registerHelper(
  'assertGithubOrganizationOk',
  function (app, assert, organization) {
    assert.githubOrganizationOk(organization);
  }
);
