import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  sha: '7fd1a60b01f91b314f59955a4e4d4e80d8edf11d',
  url() {
    return `https://api.github.com/repos/user1/repository1/git/blobs/${this.sha}`;
  },
  content: 'IyBFZGl0b3JDb25maWcgaGVscHMgZGV2ZWxvcGVycyBkZWZpbmUgYW5kIG1h\naW50YWluIGNvbnNpc3RlbnQKIyBjb2Rpbmcgc3R5bGVzIGJldHdlZW4gZGlm\nZmVyZW50IGVkaXRvcnMgYW5kIElERXMKIyBlZGl0b3Jjb25maWcub3JnCgpy\nb290ID0gdHJ1ZQoKClsqXQplbmRfb2ZfbGluZSA9IGxmCmNoYXJzZXQgPSB1\ndGYtOAp0cmltX3RyYWlsaW5nX3doaXRlc3BhY2UgPSB0cnVlCmluc2VydF9m\naW5hbF9uZXdsaW5lID0gdHJ1ZQppbmRlbnRfc3R5bGUgPSBzcGFjZQppbmRl\nbnRfc2l6ZSA9IDIKClsqLmhic10KaW5zZXJ0X2ZpbmFsX25ld2xpbmUgPSBm\nYWxzZQoKWyoue2RpZmYsbWR9XQp0cmltX3RyYWlsaW5nX3doaXRlc3BhY2Ug\nPSBmYWxzZQo=\n',
  encoding: 'base64',
  size: 368
});
