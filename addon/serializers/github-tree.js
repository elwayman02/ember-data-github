import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    let normalizedHash = {
      id: resourceHash.sha,
      sha: resourceHash.sha,
      url: resourceHash.url,
      files: resourceHash.tree
        .filter(item => item.type === 'blob')
        .reduce((files, blob) => {
          files[blob.path] = blob.sha;
          return files;
        }, {}),
      directories: resourceHash.tree
        .filter(item => item.type === 'tree')
        .reduce((files, tree) => {
          files[tree.path] = tree.sha;
          return files;
        }, {}),
      truncated: resourceHash.truncated,
      links: {
        blobs: resourceHash.tree
          .filter(item => item.type === 'blob')
          .map(blob => blob.url),
        trees: resourceHash.tree
          .filter(item => item.type === 'tree')
          .map(tree => tree.url)
      }
    };
    return this._super(modelClass, normalizedHash, prop);
  }
});
