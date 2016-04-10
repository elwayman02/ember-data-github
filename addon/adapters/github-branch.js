import GithubAdapter from './github';

export default GithubAdapter.extend({
  buildURL(type, id, snapshot) {
    let builtURL = this._super(type, id, snapshot);
    if (id) {
      builtURL = builtURL.replace('branches', 'repos');
      builtURL = builtURL.replace(/%2F/g, '/');
    }
    return builtURL;
  }
});
