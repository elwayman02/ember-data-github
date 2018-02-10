import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr('string'),
  name: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  users: DS.hasMany('githubUser', { async: true }),
  repositories: DS.hasMany('githubRepository', { async: true })
});
