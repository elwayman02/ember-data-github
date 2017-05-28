import DS from 'ember-data';

export default DS.Model.extend({
  sha: DS.attr('string'),
  url: DS.attr('string'),
  content: DS.attr('string'),
  encoding: DS.attr('string'),
  size: DS.attr('number')
});
