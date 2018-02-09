import GithubSerializer from 'ember-data-github/serializers/github';

export default GithubSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    resourceHash.id = resourceHash.recordId || resourceHash.full_name,
    resourceHash.links = {
      owner: resourceHash.owner.url,
      defaultBranch: `${resourceHash.url}/branches/${resourceHash.default_branch}`,
      branches: `${resourceHash.url}/branches`,
      pulls: `${resourceHash.url}/pulls`,
      releases: `${resourceHash.url}/releases`
    };
    return this._super(modelClass, resourceHash, prop);
  }
});
