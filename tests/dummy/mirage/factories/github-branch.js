import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name: function(i) {
    return `branch${i}`;
  },
  commit: {
    url: function(i) {
      return `https://api.github.com/repos/octocat/Hello-World/git/commits/${i}fd1a60b01f91b314f59955a4e4d4e80d8edf11d`;
    }
  },
  protected: true
});
