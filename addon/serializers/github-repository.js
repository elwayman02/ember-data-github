import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalize: function(type, hash, prop) {
    hash = {
      id: hash.full_name,
      fullName: hash.full_name,
      name: hash.name
    };
    return this._super(type, hash, prop);
  }
});
