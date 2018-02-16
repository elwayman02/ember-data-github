import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  description: attr('string'),
  fullName: attr('string'),
  homepage: attr('string'),
  language: attr('string'),
  name: attr('string'),

  forks: attr('number'),
  forksCount: attr('number'),
  openIssues: attr('number'),
  openIssuesCount: attr('number'),
  size: attr('number'),
  stargazersCount: attr('number'),
  watchers: attr('number'),
  watchersCount: attr('number'),

  fork: attr('boolean'),
  hasDownloads: attr('boolean'),
  hasIssues: attr('boolean'),
  hasPages: attr('boolean'),
  hasProjects: attr('boolean'),
  hasWiki: attr('boolean'),
  private: attr('boolean'),

  createdAt: attr('date'),
  updatedAt: attr('date'),
  pushedAt: attr('date'),

  cloneUrl: attr('string'),
  gitUrl: attr('string'),
  sshUrl: attr('string'),
  svnUrl: attr('string'),

  // Urls
  archiveUrl: attr('string'),
  assigneesUrl: attr('string'),
  blobsUrl: attr('string'),
  branchesUrl: attr('string'),
  collaboratorsUrl: attr('string'),
  commentsUrl: attr('string'),
  commitsUrl: attr('string'),
  compareUrl: attr('string'),
  contentsUrl: attr('string'),
  contributorsUrl: attr('string'),
  deploymentsUrl: attr('string'),
  downloadsUrl: attr('string'),
  eventsUrl: attr('string'),
  forksUrl: attr('string'),
  gitCommitsUrl: attr('string'),
  gitRefsUrl: attr('string'),
  gitTagsUrl: attr('string'),
  hooksUrl: attr('string'),
  htmlUrl: attr('string'),
  issueCommentUrl: attr('string'),
  issueEventsUrl: attr('string'),
  issuesUrl: attr('string'),
  keysUrl: attr('string'),
  labelsUrl: attr('string'),
  mergesUrl: attr('string'),
  milestonesUrl: attr('string'),
  notificationsUrl: attr('string'),
  pullsUrl: attr('string'),
  releasesUrl: attr('string'),
  statusesUrl: attr('string'),
  subscribersUrl: attr('string'),
  subscriptionUrl: attr('string'),
  tagsUrl: attr('string'),
  teamsUrl: attr('string'),
  treesUrl: attr('string'),
  url: attr('string'),

  // Embedded Objects
  branches: hasMany('github-branch'),
  defaultBranch: belongsTo('github-branch', { inverse: null }),
  license: attr(), // TODO: Make into a real model
  owner: belongsTo('github-user'),
  pulls: hasMany('github-pull'),
  releases: hasMany('github-release')
});
