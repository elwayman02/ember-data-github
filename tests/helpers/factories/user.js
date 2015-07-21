var sampleDate = new Date().toISOString();
export default {
  defineUser: function() {
    Factory.define('user')
      .sequence('id')
      .sequence('login', function(i) { return `user${i}`; })
      .sequence('name', function(i) { return `User ${i}`; })
      .attr('type', 'User')
      .sequence('avatar_url', function(i) { return `user${i}-avatar.gif`; })
      .attr('public_repos', 1)
      .attr('public_gists', 2)
      .attr('followers', 3)
      .attr('following', 4)
      .attr('created_at', sampleDate)
      .attr('updated_at', sampleDate)
      .sequence('repos_url', function(i) { return `https://api.github.com/users/user${i}/repos`; });
  }
};
