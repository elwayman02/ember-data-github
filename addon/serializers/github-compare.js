import DS from 'ember-data';
import GithubSerializer from 'ember-data-github/serializers/github';

const { EmbeddedRecordsMixin } = DS;

export default GithubSerializer.extend(EmbeddedRecordsMixin, {
  attrs: {
    commits: { embedded: 'always' },
    files: { embedded: 'always' },
    baseCommit: { embedded: 'always' },
    mergeBaseCommit: { embedded: 'always' }
  },

  normalize(modelClass, resourceHash, prop) {
    resourceHash.id = resourceHash.diff_url;

    return this._super(modelClass, resourceHash, prop);
  },

  extractRelationships(modelClass, resourceHash) {
    resourceHash.base_commit.type = 'github-commit';
    resourceHash.base_commit.id = resourceHash['base_commit']['sha'];

    resourceHash.merge_base_commit.type = 'github-commit';
    resourceHash.merge_base_commit.id = resourceHash['merge_base_commit']['sha'];

    resourceHash.commits.forEach((commit) => {
      commit.type = 'github-commit';
      commit.id = commit.sha;
    });

    resourceHash.files.forEach((file) => {
      file.type = 'github-file';
      file.id = file.sha;
    });

    return this._super(modelClass, resourceHash);
  }
});
