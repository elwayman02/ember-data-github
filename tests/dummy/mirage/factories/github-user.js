import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  login: function(i) {
    return `user${i}`;
  },
  name: function(i) {
    return `User ${i}`;
  },
  type: 'User',
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
