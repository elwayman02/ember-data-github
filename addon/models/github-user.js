import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr('string'),
  name: DS.attr('string'),
  type: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  publicRepos: DS.attr('number'),
  publicGists: DS.attr('number'),
  followers: DS.attr('number'),
  following: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  url: DS.attr('string'),
  githubRepositories: DS.hasMany('githubRepository', { async: true })
});
