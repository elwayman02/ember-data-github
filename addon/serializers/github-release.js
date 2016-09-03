import GithubSerializer from './github';
import { decamelize } from 'ember-string';

export default GithubSerializer.extend({
  keyForAttribute(attr) {
    return decamelize(attr);
  },

  normalize(modelClass, resourceHash, prop) {
    resourceHash.links = {
      user: resourceHash.author.url
    };
    return this._super(modelClass, resourceHash, prop);
  }
});
