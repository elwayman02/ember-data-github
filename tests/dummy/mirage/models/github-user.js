import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  repositories: hasMany('github-repository'),
  releases: hasMany('github-release')
});
