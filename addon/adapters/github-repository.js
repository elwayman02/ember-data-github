import GithubAdapter from './github';

export default GithubAdapter.extend({
  urlForFindRecord(id, modelName, snapshot) {
    let builtURL = this._super(id, modelName, snapshot);
    if (Number.isInteger(id) === false) {
      builtURL = builtURL.replace('repositories', 'repos')
    }
    return builtURL.replace('%2F', '/');
  }
});
