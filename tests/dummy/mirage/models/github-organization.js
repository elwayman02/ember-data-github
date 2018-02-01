import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  githubUsers: hasMany('githubUser'),
  githubRepositories: hasMany('githubRepository')
});
