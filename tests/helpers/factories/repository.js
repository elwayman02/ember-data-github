/* global Factory */
let sampleDate = new Date().toISOString();
export default {
  defineRepository() {
    Factory.define('repository').sequence('id')
      .sequence('name', function (i) {
        return `repository${i}`;
      }).sequence('full_name', function (i) {
        return `user1/repository${i}`;
      }).attr('description', 'This is a test repository')
      .sequence('html_url', function (i) {
        return `https://github.com/repos/user1/repository${i}`;
      }).attr('language', null)
      .attr('fork', true)
      .attr('private', true)
      .attr('created_at', sampleDate)
      .attr('updated_at', sampleDate)
      .attr('pushed_at', sampleDate)
      .attr('owner', { url: 'https://api.github.com/users/user1' })
      .attr('default_branch', 'branch1')
      .sequence('url', function (i) {
        return `https://api.github.com/repos/user1/repository${i}`;
      });
  }
};
