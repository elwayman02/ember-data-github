import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (id === '#') {
      payload.repos_url = payload.repos_url.replace(`users/${payload.login}`, 'user');
    }
    return this._super(store, primaryModelClass, payload, id, requestType);
  },

  normalize(modelClass, resourceHash, prop) {
    let normalizedHash = {
      id: resourceHash.recordId || resourceHash.login,
      login: resourceHash.login,
      name: resourceHash.name,
      type: resourceHash.type,
      avatarUrl: resourceHash.avatar_url,
      publicRepos: resourceHash.public_repos,
      publicGists: resourceHash.public_gists,
      followers: resourceHash.followers,
      following: resourceHash.following,
      createdAt: resourceHash.created_at,
      updatedAt: resourceHash.updated_at,
      url: resourceHash.url,
      links: {
        githubRepositories: resourceHash.repos_url
      }
    };
    return this._super(modelClass, normalizedHash, prop);
  }
});
