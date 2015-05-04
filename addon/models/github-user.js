import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr('string'),
  name: DS.attr('string'),
  type: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  githubRepositories: DS.hasMany('githubRepository', { async: true })
});
