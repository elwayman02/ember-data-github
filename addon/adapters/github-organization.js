import GithubAdapter from './github';

export default GithubAdapter.extend({
  buildURL: function(type, id, snapshot) {
    var builtURL = this._super(type, id, snapshot);
    builtURL = builtURL.replace('organizations', 'orgs');
    return builtURL;
  }
});
