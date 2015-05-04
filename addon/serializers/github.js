import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
  extractArray: function(store, primaryType, payload) {
    var wrappedPayload = {};
    wrappedPayload[Ember.String.pluralize(primaryType.typeKey)] = payload;
    return this._super(store, primaryType, wrappedPayload);
  },
  extractSingle: function(store, primaryType, payload, recordId) {
    payload.recordId = recordId;
    var wrappedPayload = {};
    wrappedPayload[primaryType.typeKey] = payload;
    return this._super(store, primaryType, wrappedPayload, recordId);
  }
});
