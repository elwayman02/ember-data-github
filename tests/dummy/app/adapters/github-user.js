import GitHubUserAdapter from 'ember-data-github/adapters/github';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default GitHubUserAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:github'
});
