import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalize(type, hash, prop) {
    hash = {
      id: hash.recordId || hash.login,
      login: hash.login,
      name: hash.name,
      avatarUrl: hash.avatar_url,
      links: {
        users: hash.members_url.replace(/\{\/member\}/, ''),
        repositories: hash.repos_url
      }
    };
    return this._super(type, hash, prop);
  }
});
