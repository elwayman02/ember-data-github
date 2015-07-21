import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalize: function(type, hash, prop) {
    hash = {
      id: hash.recordId || hash.full_name,
      fullName: hash.full_name,
      name: hash.name,
      description: hash.description,
      htmlUrl: hash.html_url,
      language: hash.language,
      fork: hash.fork,
      private: hash.private,
      createdAt: hash.created_at,
      updatedAt: hash.updated_at,
      pushedAt: hash.pushed_at,
      links: {
        owner: hash.owner.url,
        defaultBranch: `${hash.url}/branches/${hash.default_branch}`,
        branches: `${hash.url}/branches`
      }
    };
    return this._super(type, hash, prop);
  }
});
