import GithubSerializer from 'ember-data-github/serializers/github';

export default GithubSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    resourceHash.links = {
      user: resourceHash.author.url
    };
    return this._super(modelClass, resourceHash, prop);
  }
});
