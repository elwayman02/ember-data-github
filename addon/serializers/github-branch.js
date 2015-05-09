import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalize: function(type, hash, prop) {
    hash = {
      id: hash.recordId || hash.name,
      name: hash.name
    };
    return this._super(type, hash, prop);
  }
});
