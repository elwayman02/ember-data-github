import GithubAdapter from './github';

export default GithubAdapter.extend({
  urlForFindRecord(id, modelName, snapshot) {
    return this._super(id, modelName, snapshot)
      .replace('branches', 'repos')
      .replace(/%2F/g, '/');
  },

  urlForQuery(query) {
    const repo = query.repo;
    delete query.repo;

    return `${this.get('host')}/repos/${repo}/branches`;
  },

  urlForQueryRecord(query) {
    const {repo, branch} = query;
    delete query.repo;
    delete query.branch;

    return `${this.get('host')}/repos/${repo}/branches/${branch}`;
  }
});
