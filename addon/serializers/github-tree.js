import GithubSerializer from 'ember-data-github/serializers/github';

export default GithubSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    let blobItems = resourceHash.tree
      .filter(item => item.type === 'blob');
    let treeItems = resourceHash.tree
      .filter(item => item.type === 'tree');

  resourceHash.id = resourceHash.sha;
  resourceHash.files = blobItems.reduce((files, blob) => {
    files[blob.path] = blob.sha;
    return files;
  }, {});
  resourceHash.directories = treeItems.reduce((files, tree) => {
    files[tree.path] = tree.sha;
    return files;
  }, {});
  resourceHash.links = {
    blobs: blobItems.map(blob => blob.url),
    trees: treeItems.map(tree => tree.url)
  }

  return this._super(modelClass, resourceHash, prop);
  }
});
