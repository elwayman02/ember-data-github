import GithubAdapter from './github';

export default GithubAdapter.extend({
  buildURL(type, id, snapshot) {
    let builtURL = this._super(type, id, snapshot);
    if (id === '#') {
      builtURL = builtURL.replace('users/%23', 'user');
    }
    return builtURL;
  }
});
