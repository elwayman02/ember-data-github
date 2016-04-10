import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    let wrappedPayload = {};
    wrappedPayload[Ember.String.pluralize(primaryModelClass.modelName)] = payload;
    return this._super(store, primaryModelClass, wrappedPayload, id, requestType);
  },

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload.recordId = id;
    let wrappedPayload = {};
    wrappedPayload[primaryModelClass.modelName] = payload;
    return this._super(store, primaryModelClass, wrappedPayload, id, requestType);
  },

});
