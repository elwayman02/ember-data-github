import { isArray } from '@ember/array';
import { get } from '@ember/object';
import { isNone } from '@ember/utils';
import { pluralize } from 'ember-inflector';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload.recordId = id;
    let wrappedPayload = {};
    let fieldName = primaryModelClass.modelName;
    if (isArray(payload)) {
      fieldName = pluralize(fieldName);
    }
    wrappedPayload[fieldName] = payload;
    return this._super(store, primaryModelClass, wrappedPayload, id, requestType);
  },

  // Add metadata to the response for use with pagination. Formatted like:
  //   {
  //     first: { page: 1, per_page: 5 }
  //     next:  { page: 3, per_page: 5 },
  //     prev:  { page: 1, per_page: 5 },
  //     last:  { page: 3, per_page: 5 }
  //   }
  //
  extractMeta(store, modelClass, payload) {
    const links = get(payload, `${pluralize(modelClass.modelName)}.links`);

    if (isNone(links)) {
      return;
    }

    return Object.keys(links).reduce((meta, name) => {
      const link = links[name];
      const qs = link.split('?').pop();

      meta[name] = qs.split('&').reduce((memo, str) => {
        const [key, value] = str.split('=');
        memo[key] = parseInt(value, 10);
        return memo;
      }, {});

      return meta;
    }, {});
  }
});
