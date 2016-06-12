import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr('string'),
  name: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  githubUsers: DS.hasMany('githubUsers', { async: true }),
  githubRepositories: DS.hasMany('githubRepository', { async: true })
});
