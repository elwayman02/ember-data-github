/* global Factory */

export default {
  defineBlob() {
    Factory.define('blob')
      .sequence('sha')
      .attr('url', ['sha'], function(sha) {
        return `https://api.github.com/repos/user1/repository1/git/blobs/${sha}`;
      })
      .attr('content', 'IyBFZGl0b3JDb25maWcgaGVscHMgZGV2ZWxvcGVycyBkZWZpbmUgYW5kIG1h\naW50YWluIGNvbnNpc3RlbnQKIyBjb2Rpbmcgc3R5bGVzIGJldHdlZW4gZGlm\nZmVyZW50IGVkaXRvcnMgYW5kIElERXMKIyBlZGl0b3Jjb25maWcub3JnCgpy\nb290ID0gdHJ1ZQoKClsqXQplbmRfb2ZfbGluZSA9IGxmCmNoYXJzZXQgPSB1\ndGYtOAp0cmltX3RyYWlsaW5nX3doaXRlc3BhY2UgPSB0cnVlCmluc2VydF9m\naW5hbF9uZXdsaW5lID0gdHJ1ZQppbmRlbnRfc3R5bGUgPSBzcGFjZQppbmRl\nbnRfc2l6ZSA9IDIKClsqLmhic10KaW5zZXJ0X2ZpbmFsX25ld2xpbmUgPSBm\nYWxzZQoKWyoue2RpZmYsbWR9XQp0cmltX3RyYWlsaW5nX3doaXRlc3BhY2Ug\nPSBmYWxzZQo=\n')
      .attr('encoding', 'base64')
      .attr('size', 368);
  }
};

/* repo: srvance/ember-bootstrap, branch: add-bs4, file: /.editorconfig
{
  "sha": "219985c2289f78f0a652c317ec69c2bc355ee5e9",
  "size": 368,
  "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/219985c2289f78f0a652c317ec69c2bc355ee5e9",
  "content": "IyBFZGl0b3JDb25maWcgaGVscHMgZGV2ZWxvcGVycyBkZWZpbmUgYW5kIG1h\naW50YWluIGNvbnNpc3RlbnQKIyBjb2Rpbmcgc3R5bGVzIGJldHdlZW4gZGlm\nZmVyZW50IGVkaXRvcnMgYW5kIElERXMKIyBlZGl0b3Jjb25maWcub3JnCgpy\nb290ID0gdHJ1ZQoKClsqXQplbmRfb2ZfbGluZSA9IGxmCmNoYXJzZXQgPSB1\ndGYtOAp0cmltX3RyYWlsaW5nX3doaXRlc3BhY2UgPSB0cnVlCmluc2VydF9m\naW5hbF9uZXdsaW5lID0gdHJ1ZQppbmRlbnRfc3R5bGUgPSBzcGFjZQppbmRl\nbnRfc2l6ZSA9IDIKClsqLmhic10KaW5zZXJ0X2ZpbmFsX25ld2xpbmUgPSBm\nYWxzZQoKWyoue2RpZmYsbWR9XQp0cmltX3RyYWlsaW5nX3doaXRlc3BhY2Ug\nPSBmYWxzZQo=\n",
  "encoding": "base64"
}
*/
