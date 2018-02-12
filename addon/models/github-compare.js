import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  aheadBy: attr('number'),
  behindBy: attr('number'),
  status: attr('string'),
  totalCommits: attr('number'),
  diffUrl: attr('string'),
  htmlUrl: attr('string'),
  patchUrl: attr('string'),
  permalinkUrl: attr('string'),

  baseCommit: belongsTo('github-commit'),
  mergeBaseCommit: belongsTo('github-commit'),
  commits: hasMany('github-commit'),
  files: hasMany('github-file')
});
