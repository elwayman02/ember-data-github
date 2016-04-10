import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalize(type, hash, prop) {
    hash = {
      id: hash.recordId || hash.commit.url.replace('https://api.github.com/repos/', '').replace(/\/commits\/.+/, `/branches/${hash.name}`),
      name: hash.name
    };
    return this._super(type, hash, prop);
  }
});
