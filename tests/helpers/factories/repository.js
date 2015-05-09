export default {
  defineRepository: function() {
    Factory.define('repository')
      .sequence('id')
      .sequence('name', function(i) { return `repository${i}`; })
      .sequence('full_name', function(i) { return `user1/repository${i}`; })
      .attr('description', 'This is a test repository')
      .attr('owner', { url: 'https://api.github.com/users/user1' })
      .attr('default_branch', 'branch1')
      .sequence('url', function(i) { return `https://api.github.com/repos/user1/repository${i}`; });
  }
};
