import GithubSerializer from 'ember-data-github/serializers/github';
import DS from 'ember-data';

const { EmbeddedRecordsMixin } = DS;

export default GithubSerializer.extend(EmbeddedRecordsMixin, {
  attrs: {
    owner: { embedded: 'always' }
  },

  normalize(modelClass, resourceHash, prop) {
    resourceHash.id = resourceHash.recordId || resourceHash.full_name,
    resourceHash.links = {
      defaultBranch: `${resourceHash.url}/branches/${resourceHash.default_branch}`,
      branches: `${resourceHash.url}/branches`,
      pulls: `${resourceHash.url}/pulls`,
      releases: `${resourceHash.url}/releases`
    };
    return this._super(modelClass, resourceHash, prop);
  }
});
