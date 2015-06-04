import GithubSerializer from './github';

export default GithubSerializer.extend({
  extractSingle: function(store, primaryType, payload, recordId) {
    if(recordId==='#') {
      payload.repos_url = payload.repos_url.replace(`users/${payload.login}`, 'user');
    }
    return this._super(store, primaryType, payload, recordId);
  },
  normalize: function(type, hash, prop) {
    hash = {
      id: hash.recordId || hash.login,
      login: hash.login,
      name: hash.name,
      type: hash.type,
      avatarUrl: hash.avatar_url,
      links: {
        githubRepositories: hash.repos_url
      },
      publicRepos: has.public_repos,
      publicGists: has.public_gists,
      followers: has.followers,
      following: has.following,
      createdAt: has.created_at,
      updatedAt: has.updated_at
    };
    return this._super(type, hash, prop);
  }
});
