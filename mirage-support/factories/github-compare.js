import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  ahead_by: faker.random.number(),
  behind_by: faker.random.number(),
  status: 'behind',
  total_commits: faker.random.number(),
  diff_url: 'https://github.com/octocat/Hello-World/compare/master...topic.diff',
  html_url: 'https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e',
  patch_url: 'https://github.com/octocat/Hello-World/compare/master...topic.patch',
  permalink_url: 'https://github.com/octocat/Hello-World/compare/octocat:bbcd538c8e72b8c175046e27cc8f907076331401...octocat:0328041d1152db8ae77652d1618a02e57f745f17',

  afterCreate(githubCompare, server) {
    // manually setup related records
    githubCompare.baseCommit =  server.create('github-commit');
    githubCompare.mergeBaseCommit = server.create('github-commit');
    githubCompare.commits = server.createList('github-commit', 3);
    githubCompare.files = server.createList('github-file', 3);
    githubCompare.save();
  }
});
