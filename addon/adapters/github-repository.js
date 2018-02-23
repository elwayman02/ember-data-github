import GithubAdapter from './github';

export default GithubAdapter.extend({
  urlForFindRecord(id/*, modelName, snapshot*/) {
    const isInteger = /^\d+$/;
    let builtURL = this._super(...arguments);
    if (!isInteger.test(id)) {
      builtURL = builtURL.replace('repositories', 'repos');
    }
    return builtURL.replace('%2F', '/');
  },

  urlForQuery(query/*, modelName */) {
    let builtURL = this._super(...arguments);
    let { user } = query;

    delete query.user;

    return builtURL.replace('repositories', `users/${user}/repos`);
  }
});
