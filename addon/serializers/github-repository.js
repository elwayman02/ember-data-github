import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    let hash = {
      id: resourceHash.recordId || resourceHash.full_name,
      fullName: resourceHash.full_name,
      name: resourceHash.name,
      description: resourceHash.description,
      htmlUrl: resourceHash.html_url,
      language: resourceHash.language,
      fork: resourceHash.fork,
      private: resourceHash.private,
      createdAt: resourceHash.created_at,
      updatedAt: resourceHash.updated_at,
      pushedAt: resourceHash.pushed_at,
      links: {
        owner: resourceHash.owner.url,
        defaultBranch: `${resourceHash.url}/branches/${resourceHash.default_branch}`,
        branches: `${resourceHash.url}/branches`,
        pulls: `${resourceHash.url}/pulls`,
        releases: `${resourceHash.url}/releases`
      }
    };
    return this._super(modelClass, hash, prop);
  }
});
