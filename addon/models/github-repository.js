import DS from 'ember-data';

export default DS.Model.extend({
  fullName: DS.attr('string'),
  name: DS.attr('string'),
  htmlUrl: DS.attr('string'),
  language: DS.attr('string'),
  description: DS.attr('string'),
  fork: DS.attr('boolean'),
  private: DS.attr('boolean'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  pushedAt: DS.attr('date'),
  owner: DS.belongsTo('githubUser', {
    async: true,
    inverse: null
  }),
  defaultBranch: DS.belongsTo('githubBranch', {
    async: true,
    inverse: null
  }),
  branches: DS.hasMany('githubBranch', { async: true }),
  pulls: DS.hasMany('githubPull', { async: true }),
  releases: DS.hasMany('githubRelease', { async: true })
});
