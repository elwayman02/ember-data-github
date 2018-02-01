import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  owner: belongsTo('githubUser', { inverse: null }),
  defaultBranch: belongsTo('githubBranch', { inverse: null }),
  pulls: hasMany('githubPull'),
  branches: hasMany('githubBranch'),
  releases: hasMany('githubRelease')
});
