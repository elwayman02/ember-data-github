import GithubAdapter from './github';

export default GithubAdapter.extend({
  urlForQueryRecord(query) {
    const user = query.user;
    const repo = query.repo;
    const sha = query.sha;
    delete query.user;
    delete query.repo;
    delete query.sha;

    return `${this.get('host')}/repos/${user}/${repo}/git/blobs/${sha}`;
  }
});
