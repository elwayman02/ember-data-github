import GithubAdapter from './github';

export default GithubAdapter.extend({
  urlForFindRecord(id, modelName, snapshot) {
    return this._super(id, modelName, snapshot)
      .replace('repositories', 'repos')
      .replace('%2F', '/');
  }
});
