import { Factory, faker, trait } from 'ember-cli-mirage';

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
    githubRepository.owner = server.create('github-user');
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
  })
});
