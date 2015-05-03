import GithubAdapter from './github';

export default GithubAdapter.extend({
  buildURL: function(type, id, snapshot) {
    var builtURL = this._super(type, id, snapshot);
    if(id==='#') {
      builtURL = builtURL.replace('users/%23', 'user');
    }
    return builtURL;
  }
});
