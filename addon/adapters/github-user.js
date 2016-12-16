import GithubAdapter from './github';

export default GithubAdapter.extend({
  urlForFindRecord(id, modelName, snapshot) {
    let builtURL = this._super(id, modelName, snapshot);
    if (id === '#') {
      builtURL = builtURL.replace('users/%23', 'user');
    }
    return builtURL;
  }
});
