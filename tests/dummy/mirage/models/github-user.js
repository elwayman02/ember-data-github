import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  repositories: hasMany('githubRepository'),
  releases: hasMany('githubRelease')
});
