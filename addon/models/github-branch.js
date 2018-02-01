import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  commit: DS.attr(),
  protected: DS.attr('boolean')
});
