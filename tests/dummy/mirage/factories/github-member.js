import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  login: function(i) {
    return `member${i}`;
  },
  type: 'github-member',
  avatar_url: function(i) {
    return `member${i}-avatar.gif`;
  },
  gravatar_id: '',
  site_admin: false,
  url: function(i) {
    return `https://api.github.com/users/member${i}`;
  }
});
