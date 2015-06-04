import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalize: function(type, hash, prop) {
    hash = {
      id: hash.recordId || hash.full_name,
      fullName: hash.full_name,
      name: hash.name,
      description: hash.description,
      language: hash.language,
      isFork: hash.fork,
      isPrivate: hash.private,
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
