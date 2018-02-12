import { Factory, trait } from 'ember-cli-mirage';

export default Factory.extend({
  login: function(i) {
    return `organization${i}`;
  },
  name: function(i) {
    return `Organization ${i}`;
  },
  avatar_url: function(i) {
    return `organization${i}-avatar.gif`;
  },
  members_url: function(i) {
    return `https://api.github.com/orgs/organization${i}/members{/member}`;
  },
  repos_url: function(i) {
    return `https://api.github.com/orgs/organization${i}/repos`;
  },

  withRepositories: trait({
    afterCreate(organization) {
      server.createList('githubRepository', 2, { owner: organization });
    }
  }),
  withMembers: trait({
    afterCreate(organization) {
      server.createList('githubMember', 2, { organization });
    }
  })
});
