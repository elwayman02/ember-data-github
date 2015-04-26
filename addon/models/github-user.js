import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  githubRepositories: DS.hasMany('githubRepository', { async: true })
});
