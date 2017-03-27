import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'raw_url',
  normalizeResponse() {
    return this._super(...arguments);
  }
});
