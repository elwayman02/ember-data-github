import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  owner: belongsTo('githubUser', { inverse: null }),
  defaultBranch: belongsTo('github-branch', { inverse: null }),
  pulls: hasMany('github-pull'),
  branches: hasMany('github-branch'),
  releases: hasMany('github-release')
});
