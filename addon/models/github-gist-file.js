import DS from 'ember-data';

let { attr } = DS;

export default DS.Model.extend({
  content: attr('string'),
  name: attr('string'),
  type: attr('string'),
  language: attr('string'),
  size: attr('number'),
  truncated: attr('boolean')
});
