import DS from 'ember-data';

export default DS.Model.extend({
  fullName: DS.attr('string'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  owner: DS.belongsTo('githubUser', {
    async: true,
    inverse: null
  })
});
