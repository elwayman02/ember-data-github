import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  baseCommit: belongsTo('github-commit'),
  mergeBaseCommit: belongsTo('github-commit'),
  commits: hasMany('github-commit'),
  files: hasMany('github-file')
});
