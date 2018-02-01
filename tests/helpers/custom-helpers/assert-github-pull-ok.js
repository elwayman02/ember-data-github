import { registerHelper } from '@ember/test';
import QUnit from 'qunit';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.githubPullOk = assertionBuilder([
  'id',
  'number',
  'title',
  'state',
  'htmlUrl',
  'body',
  'createdAt',
  'updatedAt',
  'closedAt',
  'mergedAt',
  'userLogin',
  'userAvatarUrl'
]);

export default registerHelper(
  'githubPullOk',
  function (app, assert, release) {
    assert.githubPullOk(release);
  }
);
