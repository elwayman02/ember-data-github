import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  login: faker.lorem.word(),
  name: faker.internet.userName(),
  type: 'User',
  avatar_url: faker.internet.url(),
  public_repos: 1,
  public_gists: 2,
  followers: 3,
  following: 4,
  created_at: faker.date.past(),
  updated_at: faker.date.recent(),
  repos_url: function(i) {
    return `https://api.github.com/users/user${i}/repos`;
  },
  url: function(i) {
    return `https://api.github.com/users/user${i}`;
  }
});
