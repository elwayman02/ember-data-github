import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  id() {
    return this.sha;
  },
  additions: faker.random.number(),
  blob_url: 'https://github.com/octocat/Hello-World/blob/7ca483543807a51b6079e54ac4cc392bc29ae284/file1.txt',
  changes: faker.random.number(),
  deletions: faker.random.number(),
  filename: 'file1.text',
  patch: '@@ -29,7 +29,7 @@\n.....',
  raw_url: 'https://github.com/octocat/Hello-World/raw/7ca483543807a51b6079e54ac4cc392bc29ae284/file1.txt',
  sha: function(i) {
    return `51a87a3027a3ab2asfsfb23dd24186dfd7d587${i}`
  },
  status: 'modified'
});
