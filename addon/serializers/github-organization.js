import GithubSerializer from 'ember-data-github/serializers/github';

export default GithubSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    resourceHash.id = resourceHash.recordId || resourceHash.login;
    resourceHash.links = {
      members: resourceHash.members_url.replace(/\{\/member\}/, ''),
      repositories: resourceHash.repos_url
    };
    return this._super(modelClass, resourceHash, prop);
  }
});
