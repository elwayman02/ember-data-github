import GithubSerializer from 'ember-data-github/serializers/github';

export default GithubSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    resourceHash.id = resourceHash.recordId || resourceHash.commit.url.replace('https://api.github.com/repos/', '').replace(/\/commits\/.+/, `/branches/${resourceHash.name}`);

    return this._super(modelClass, resourceHash, prop);
  }
});
