import GithubAdapter from './github';

export default GithubAdapter.extend({
  urlForFindRecord(id, modelName, snapshot) {
    const isInteger = /^\d+$/;
    let builtURL = this._super(id, modelName, snapshot);
    if (!isInteger.test(id)) {
      builtURL = builtURL.replace('repositories', 'repos')
    }
    return builtURL.replace('%2F', '/');
  }
});
