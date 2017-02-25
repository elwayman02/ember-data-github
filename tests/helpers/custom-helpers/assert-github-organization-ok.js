import QUnit from 'qunit';
import Ember from 'ember';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubOrganizationOk = assertionBuilder([
  'id',
  'login',
  'name',
  'avatarUrl'
]);

export default Ember.Test.registerHelper(
  'assertGithubOrganizationOk',
  function (app, assert, organization) {
    assert.githubOrganizationOk(organization);
  }
);
