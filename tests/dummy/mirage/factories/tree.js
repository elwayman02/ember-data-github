import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  path: 'file.rb',
  mode: 100644,
  type: faker.list.cycle('blob', 'tree'),
  sha: '44b4fc6d56897b048c772eb4087f854f46256132',
  url() {
    return `https://api.github.com/repos/user1/repository1/git/blobs/${this.sha}`;
  }
});
