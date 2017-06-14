import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    let blobItems = resourceHash.tree
      .filter(item => item.type === 'blob');
    let treeItems = resourceHash.tree
      .filter(item => item.type === 'tree');

    let normalizedHash = {
      id: resourceHash.sha,
      sha: resourceHash.sha,
      url: resourceHash.url,
      files: blobItems
        .reduce((files, blob) => {
          files[blob.path] = blob.sha;
          return files;
        }, {}),
      directories: treeItems
        .reduce((files, tree) => {
          files[tree.path] = tree.sha;
          return files;
        }, {}),
      truncated: resourceHash.truncated,
      links: {
        blobs: blobItems
          .map(blob => blob.url),
        trees: treeItems
          .map(tree => tree.url)
      }
    };
    return this._super(modelClass, normalizedHash, prop);
  }
});
