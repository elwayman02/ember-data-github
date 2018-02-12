import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  members: hasMany('github-member'),
  repositories: hasMany('github-repository')
});
