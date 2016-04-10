import DS from 'ember-data';
import Ember from 'ember';

const { isArray, String:Str } = Ember;

export default DS.RESTSerializer.extend({

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload.recordId = id;
    let wrappedPayload = {};
    let fieldName = primaryModelClass.modelName;
    if (isArray(payload)) {
      fieldName = Str.pluralize(fieldName);
    }
    wrappedPayload[fieldName] = payload;
    return this._super(store, primaryModelClass, wrappedPayload, id, requestType);
  }
});
