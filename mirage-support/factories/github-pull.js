import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  number: faker.random.number(),
  title: faker.lorem.words(),
  state: 'open',
  html_url: function(i) {
    return `https://github.com/octocat/Hello-World/pull/${i}`;
  },
  body: faker.lorem.words(),
  created_at: faker.date.past(),
  updated_at: faker.date.past(),
  closed_at: faker.date.past(),
  merged_at: faker.date.past(),

  afterCreate(pull, server) {
    pull.update('user', server.create('github-user'));
  }
});
