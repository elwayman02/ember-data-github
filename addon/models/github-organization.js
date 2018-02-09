import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr('string'),
  name: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  users: DS.hasMany('githubUser'),
  repositories: DS.hasMany('githubRepository')
});
