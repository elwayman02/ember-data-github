import GithubAdapter from 'ember-data-github/adapters/github';

export default GithubAdapter.extend({
  urlForQuery(query) {
    const org = query.org;
    delete query.org;

    return `${this.get('host')}/orgs/${org}/members`;
  },
});
