import GithubSerializer from 'ember-data-github/serializers/github';

export default GithubSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    resourceHash.user_avatar_url = resourceHash.user.avatar_url;
    resourceHash.user_login = resourceHash.user.login,
    resourceHash.links =  {
      user: resourceHash.user.url
    };
    return this._super(modelClass, resourceHash, prop);
  }
});
