export default {
  defineBranch: function() {
    Factory.define('branch')
      .sequence('name', function(i) { return `branch${i}`; })
      .attr('commit', {
        url: 'https://api.github.com/repos/user1/repository1/commits/c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc'
      });
  }
};
