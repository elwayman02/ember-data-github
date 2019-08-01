import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name: function(i) {
    return `repository${i}`;
  },
  full_name: function(i) {
    return `user${i}/${i}`
  },
  description: 'This is a test repository',
  html_url: function(i) {
    return `https://github.com/repos/user1/repository${i}`;
  },
  login: function(i) {
    return `user${i}`;
  },
  fork: true,
  private: true,
  created_at: faker.date.past(),
  updated_at: faker.date.past(),
  pushed_at: faker.date.recent(),
  default_branch: function(i) {
    return `branch${i}`;
  },
  url: function(i) {
    return `https://api.github.com/repos/user${i}/repository${i}`;
  },

  afterCreate(githubRepository, server) {
    server.create('github-user', { repositories: [githubRepository] });
  },

  withBranches: trait({
    afterCreate(repository) {
      server.createList('githubBranch', 2, { repository });
    }
  }),

  withReleases: trait({
    afterCreate(repository) {
      server.createList('githubRelease', 2, { repository });
    }
  }),

  withPulls: trait({
    afterCreate(repository) {
      server.createList('githubPull', 2, { repository });
    }
  })
});
