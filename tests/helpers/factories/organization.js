export default {
  defineOrganization() {
    Factory.define('organization').sequence('id')
      .sequence('login', function (i) {
        return `organization${i}`;
      }).sequence('name', function (i) {
        return `Organization ${i}`;
      }).sequence('avatar_url', function (i) {
        return `organization${i}-avatar.gif`;
      }).sequence('repos_url', function (i) {
        return `https://api.github.com/orgs/organization${i}/repos`;
      });
  }
};
