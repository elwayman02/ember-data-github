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

  owner: belongsTo('githubUser'),
  defaultBranch: belongsTo('githubBranch', { inverse: null }),
  branches: hasMany('githubBranch'),
  pulls: hasMany('githubPull'),
  releases: hasMany('githubRelease')
});
