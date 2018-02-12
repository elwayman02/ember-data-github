import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  sha: '7fd1a60b01f91b314f59955a4e4d4e80d8edf11d',
  url() {
    return `https://api.github.com/user1/repository1/git/trees/${this.sha}`;
  },
  truncated: false,

  afterCreate(githubTree, server) {
    githubTree.update('tree', server.createList('tree', 3));
  }
});
