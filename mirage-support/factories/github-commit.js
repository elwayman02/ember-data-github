import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  id() {
    return this.sha;
  },
  sha: function(i) {
    return `${i}51a87a3027a3ab2asfsfb23dd24186dfd7d587`
  },
  commit: {
    message: faker.random.words()
  },
  url: 'https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e'
});
