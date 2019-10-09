import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  login: function(i) {
    return `user${i}`;
  },
  name: function(i) {
    return `User ${i}`;
  },
  // needs to be the actual related model name for Ember Data reasons? 🤔
  type: 'github-user',
  avatar_url: function(i) {
    return `user${i}-avatar.gif`;
  },
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
  },

  withRepositories: trait({
    afterCreate(user) {
      server.createList('githubRepository', 2, { owner: user });
    }
  }),
});
