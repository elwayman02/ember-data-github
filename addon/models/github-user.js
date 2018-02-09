import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr('string'),
  name: DS.attr('string'),
  type: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  htmlUrl: DS.attr('string'),
  publicRepos: DS.attr('number'),
  publicGists: DS.attr('number'),
  followers: DS.attr('number'),
  following: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  url: DS.attr('string'),
  company: DS.attr('string'),
  blog: DS.attr('string'),
  location: DS.attr('string'),
  email: DS.attr('string'),
  bio: DS.attr('string'),
  repositories: DS.hasMany('githubRepository', { async: true })
});
