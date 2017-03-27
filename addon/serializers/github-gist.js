import Ember from 'ember';
import GithubSerializer from './github';

let { decamelize } = Ember.String;

export default GithubSerializer.extend({
  keyForAttribute(attr) {
    return decamelize(attr);
  },

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload.files) {
      let files = payload.files;
      payload.files = Object.keys(files).map(function(key) {
        let file = files[key];
        file.name = key;
        return file;
      });
    }

    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
