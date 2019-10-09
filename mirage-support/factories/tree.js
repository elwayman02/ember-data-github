import { Factory } from 'ember-cli-mirage';

const types = ['blob', 'tree'];

export default Factory.extend({
  path: 'file.rb',
  mode: 100644,
  type(i){
    return types[i % types.length];
  },
  sha: '44b4fc6d56897b048c772eb4087f854f46256132',
  url() {
    return `https://api.github.com/repos/user1/repository1/git/blobs/${this.sha}`;
  }
});
