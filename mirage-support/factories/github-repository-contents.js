import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  content: "ewogICJuYW1lIjogInNhdXNhZ2V",
  download_url: function() {
    return `https://raw.githubusercontent.com/user1/repository1/master/${this.name}?token=123456`;
  },
  git_url: function() {
    return `https://api.github.com/repos/user1/repository1/git/blobs/ff6447f1dd151539e92de91c9465c549f5d77829`;
  },

  html_url: function() {
    return `https://github.com/user1/repository1/blob/master/${this.name}`;
  },

  url: function() {
    return `https://api.github.com/repos/user1/repository1/contents/${this.file}?ref=master`;
  },
  
  encoding: 'base64',
  name(i) {
    return `name${i}.extension`;
  },
  path(i) {
    return `name${i}.extension`;
  },
  sha: "ff6447f1dd151539e92de91c9465c549f5d77829",
  size: 377,
  type: 'file'
});
