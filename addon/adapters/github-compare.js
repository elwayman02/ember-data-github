import GithubAdapter from 'ember-data-github/adapters/github';

export default GithubAdapter.extend({
  urlForQueryRecord(query) {
    const { repo, base, head } = query;
    delete query.repo;
    delete query.base;
    delete query.head;

    return `${this.get('host')}/repos/${repo}/compare/${base}...${head}`;
  }
});
