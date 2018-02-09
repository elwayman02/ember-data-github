import { registerHelper } from '@ember/test';
import QUnit from 'qunit';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubMemberOk = assertionBuilder([
  'id',
  'login',
  'avatarUrl',
  'gravatarId',
  'url',
  'type',
  'siteAdmin'
]);

export default registerHelper(
  'assertGithubMemberOk',
  function (app, assert, member) {
    assert.githubMemberOk(member);
  }
);
