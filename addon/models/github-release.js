import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  url: DS.attr('string'),
  htmlUrl: DS.attr('string'),
  assetsUrl: DS.attr('string'),
  uploadUrl: DS.attr('string'),
  tarballUrl: DS.attr('string'),
  zipballUrl: DS.attr('string'),
  tagName: DS.attr('string'),
  targetCommitish: DS.attr('string'),
  body: DS.attr('string'),
  draft: DS.attr('boolean'),
  prerelease: DS.attr('boolean'),
  createdAt: DS.attr('date'),
  publishedAt: DS.attr('date'),

  user: DS.belongsTo('githubUser', {
    async: true,
    inverse: null
  })
});
