import GithubSerializer from 'ember-data-github/serializers/github';
import DS from 'ember-data';

const { EmbeddedRecordsMixin } = DS;

export default GithubSerializer.extend(EmbeddedRecordsMixin, {
  attrs: {
    user: { embedded: 'always' }
  },

  normalize(modelClass, resourceHash, prop) {
    resourceHash.user_avatar_url = resourceHash.user.avatar_url;
    resourceHash.user_login = resourceHash.user.login;

    return this._super(modelClass, resourceHash, prop);
  }
});
