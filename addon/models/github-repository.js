import DS from 'ember-data';

export default DS.Model.extend({
  fullName: DS.attr('string'),
  name: DS.attr('string'),
  language: DS.attr('string'),
  description: DS.attr('string'),
  owner: DS.belongsTo('githubUser', {
    async: true,
    inverse: null
  }),
  defaultBranch: DS.belongsTo('githubBranch', {
    async: true,
    inverse: null
  }),
  isFork: DS.attr('boolean'),
  isPrivate: DS.attr('boolean'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  pushedAt: DS.attr('date'),
  branches: DS.hasMany('githubBranch', { async: true, })
});
