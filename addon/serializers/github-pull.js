import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    let hash = {
      id: resourceHash.id,
      title: resourceHash.title,
      state: resourceHash.state,
      htmlUrl: resourceHash.html_url,
      body: resourceHash.body,
      createdAt: resourceHash.created_at,
      updatedAt: resourceHash.updated_at,
      closedAt: resourceHash.closed_at,
      mergedAt: resourceHash.merged_at,
      links: {
        user: resourceHash.user.url
      }
    };
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    return this._super(modelClass, hash, prop);
  }
});
