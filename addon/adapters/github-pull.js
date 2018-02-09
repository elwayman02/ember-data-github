import GithubAdapter from './github';

export default GithubAdapter.extend({
  urlForQuery(query) {
    const repo = query.repo;
    delete query.repo;
    return `${this.get('host')}/repos/${repo}/pulls`;
  },

  urlForQueryRecord(query) {
    const repo = query.repo;
    const pullId = query.pullId;
    delete query.repo;
    delete query.pullId;

    return `${this.get('host')}/repos/${repo}/pulls/${pullId}`;
  }
});
