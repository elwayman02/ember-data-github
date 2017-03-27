import DS from 'ember-data';

let { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  url: attr('string'),
  forksUrl: attr('string'),
  commitsUrl: attr('string'),
  description: attr('string'),
  public: attr('boolean'),
  owner: belongsTo('github-user'),
  // user: attr() // What is this?
  files: hasMany('github-gist-file'),
  truncated: attr('boolean'),
  comments: attr('number'),
  commentsUrl: attr('string'),
  htmlUrl: attr('string'),
  gitPullUrl: attr('string'),
  gitPushUrl: attr('string'),
  createdAt: attr('date'),
  updatedAt: attr('date'),
  // forks: DS.hasMany('github-gist-fork'), // make new model or reuse?
  // history: DS.hasMany('github-gist-history')
});
