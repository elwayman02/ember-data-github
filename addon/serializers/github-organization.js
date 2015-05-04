import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalize: function(type, hash, prop) {
    hash = {
      id: hash.recordId || hash.login,
      login: hash.login,
      name: hash.name,
      avatarUrl: hash.avatar_url,
      links: {
        githubRepositories: hash.repos_url
      }
    };
    return this._super(type, hash, prop);
  }
});
