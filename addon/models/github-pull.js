import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  state: DS.attr('string'),
  htmlUrl: DS.attr('string'),
  body: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  closedAt: DS.attr('date'),
  mergedAt: DS.attr('date'),
  user: DS.belongsTo('githubUser', {
    async: true,
    inverse: null
  })
});
