import GitHubAdapter from 'ember-data-github/adapters/github';

export default GitHubAdapter.extend({
  urlForQueryRecord(query) {
    const repo = query.repo;
    const file = query.file;
    delete query.repo;
    delete query.file;

    return `${this.get('host')}/repos/${repo}/contents/${file}`;
  }
});
