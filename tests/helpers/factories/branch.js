export default {
  defineBranch: function() {
    Factory.define('branch')
      .sequence('name', function(i) { return `branch${i}`; });
  }
};
