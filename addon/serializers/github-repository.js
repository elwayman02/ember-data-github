import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalize: function(type, hash, prop) {
    hash = {
      id: hash.recordId || hash.full_name,
      fullName: hash.full_name,
      name: hash.name,
      description: hash.description,
      links: {
        owner: hash.owner.url
      }
    };
    return this._super(type, hash, prop);
  }
});
