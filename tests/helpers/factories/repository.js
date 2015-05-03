export default {
  defineRepository: function() {
    Factory.define('repository')
      .sequence('id')
      .sequence('name', function(i) { return `repository${i}`; })
      .sequence('full_name', function(i) { return `user1/repository${i}`; });
  }
};
