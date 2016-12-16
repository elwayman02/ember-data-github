import GithubAdapter from './github';

export default GithubAdapter.extend({
  urlForFindRecord(id, modelName, snapshot) {
    return this._super(id, modelName, snapshot)
      .replace('branches', 'repos')
      .replace(/%2F/g, '/');
  }
});
