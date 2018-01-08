import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.lorem.word(),
  commit: {
    url: 'https://api.github.com/repos/octocat/Hello-World/git/commits/7fd1a60b01f91b314f59955a4e4d4e80d8edf11d'
  }
});
