import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tag_name: function(i) {
    return `v1.0.${i}`;
  },
  url: function(i) {
    return `https://api.github.com/repos/user1/repository1/releases/${i}`;
  },
  html_url: function(i) {
    return `https://github.com/repos/user1/repository1/releases/$v1.0.${i}`;
  },
  assets_url: function(i) {
    return `https://api.github.com/repos/user1/repository1/releases/${i}/assets`;
  },
  upload_url: function(i) {
    return `https://uploads.github.com/repos/user1/repository1/releases/${i}/assets{?name,label}`;
  },
  tarball_url: function(i) {
    return `https://api.github.com/repos/user1/repository1/tarball/v1.0.${i}`;
  },
  zipball_url: function(i) {
    return `https://api.github.com/repos/user1/repository1/zipball/v1.0.${i}`;
  },
  target_commitish: 'master',
  name: function(i) {
    return `release${i}`;
  },
  body: 'release body',
  draft: true,
  prerelease: true,
  created_at: faker.date.past(),
  published_at: faker.date.past(),
  author: {
    url: 'https://api.github.com/users/user1'
  }
});
