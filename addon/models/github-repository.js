import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  fullName: attr('string'),
  name: attr('string'),
  htmlUrl: attr('string'),
  language: attr('string'),
  description: attr('string'),
  fork: attr('boolean'),
  private: attr('boolean'),
  createdAt: attr('date'),
  updatedAt: attr('date'),
  pushedAt: attr('date'),

  owner: belongsTo('github-user'),
  defaultBranch: belongsTo('github-branch', { inverse: null }),
  branches: hasMany('github-branch'),
  pulls: hasMany('github-pull'),
  releases: hasMany('github-release')
});
