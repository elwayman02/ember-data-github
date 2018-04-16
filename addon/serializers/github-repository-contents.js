import GitHubSerializer from 'ember-data-github/serializers/github';

export default GitHubSerializer.extend({
  extractId(modelClass, resourceHash) {
    return resourceHash.url;
  },

  modelNameFromPayloadKey() {
    return 'github-repository-contents';
  }
});
