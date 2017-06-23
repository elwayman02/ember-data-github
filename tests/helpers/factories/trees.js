/* global Factory */

export default {
  defineTree() {
    Factory.define('tree')
      .sequence('sha')
      .attr('url', ['sha'], function(sha) {
        return `https://api.github.com/user1/repository1/git/trees/${sha}`;
      })
      .attr('tree', ['sha'], function(sha) {
        let tree = [];
        let fileSha = sha + 100;
        tree.push({
          path: "file.js",
          mode: "100644",
          type: "blob",
          sha: `${fileSha}`,
          size: 17,
          url: `https://api.github.com/repos/user1/repository1/git/blobs/${fileSha}`
        });
        let treeSha = fileSha + 1;
        tree.push({
          path: "config",
          mode: "040000",
          type: "tree",
          sha: `${treeSha}`,
          url: `https://api.github.com/user1/repository1/git/trees/${treeSha}`
        });

        return tree;
      })
      .attr('truncated', false);
  }
}

/*
{
  "sha": "96e2b883219731e82b5a23e67c61c2ac6a3a2a4f",
  "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/trees/96e2b883219731e82b5a23e67c61c2ac6a3a2a4f",
  "tree": [
    {
      "path": ".bowerrc",
      "mode": "100644",
      "type": "blob",
      "sha": "959e1696e7b2c970005c35ec8a0f94aea5df36ac",
      "size": 60,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/959e1696e7b2c970005c35ec8a0f94aea5df36ac"
    },
    {
      "path": ".codeclimate.yml",
      "mode": "100644",
      "type": "blob",
      "sha": "d3b0a543dfe8f8b71e03b8fb635b1a6fbaadd205",
      "size": 67,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/d3b0a543dfe8f8b71e03b8fb635b1a6fbaadd205"
    },
    {
      "path": ".editorconfig",
      "mode": "100644",
      "type": "blob",
      "sha": "219985c2289f78f0a652c317ec69c2bc355ee5e9",
      "size": 368,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/219985c2289f78f0a652c317ec69c2bc355ee5e9"
    },
    {
      "path": ".ember-cli",
      "mode": "100644",
      "type": "blob",
      "sha": "ee64cfed2a8905dc23506af1060ec80cf887582d",
      "size": 280,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/ee64cfed2a8905dc23506af1060ec80cf887582d"
    },
    {
      "path": ".gitignore",
      "mode": "100644",
      "type": "blob",
      "sha": "9936dc90fd24a5247efd99e1528e099854ffea3e",
      "size": 268,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/9936dc90fd24a5247efd99e1528e099854ffea3e"
    },
    {
      "path": ".jscsrc",
      "mode": "100644",
      "type": "blob",
      "sha": "f2011001b778d9384f175d3505515081b96f2407",
      "size": 69,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/f2011001b778d9384f175d3505515081b96f2407"
    },
    {
      "path": ".jshintrc",
      "mode": "100644",
      "type": "blob",
      "sha": "d421faa302f008117defd3bc1aee737aab78055a",
      "size": 518,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/d421faa302f008117defd3bc1aee737aab78055a"
    },
    {
      "path": ".npmignore",
      "mode": "100644",
      "type": "blob",
      "sha": "75c07386ea0137971521e7e57b1525bf9dc5799e",
      "size": 270,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/75c07386ea0137971521e7e57b1525bf9dc5799e"
    },
    {
      "path": ".travis.yml",
      "mode": "100644",
      "type": "blob",
      "sha": "cbb91ee09859214bd96052c9e5ed43d46ab09a39",
      "size": 612,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/cbb91ee09859214bd96052c9e5ed43d46ab09a39"
    },
    {
      "path": ".watchmanconfig",
      "mode": "100644",
      "type": "blob",
      "sha": "e7834e3e4f39c1a745942dfe90891708593e0ea6",
      "size": 37,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/e7834e3e4f39c1a745942dfe90891708593e0ea6"
    },
    {
      "path": "CHANGELOG.md",
      "mode": "100644",
      "type": "blob",
      "sha": "120588bcd164011305f5a622ed9686586b451744",
      "size": 23829,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/120588bcd164011305f5a622ed9686586b451744"
    },
    {
      "path": "LICENSE.md",
      "mode": "100644",
      "type": "blob",
      "sha": "02000b56e60d3755718d2e3017f80913b2da9dce",
      "size": 1066,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/02000b56e60d3755718d2e3017f80913b2da9dce"
    },
    {
      "path": "README.md",
      "mode": "100644",
      "type": "blob",
      "sha": "332bbf8183213e0551c8ca4579a1b0c7948001e2",
      "size": 2630,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/332bbf8183213e0551c8ca4579a1b0c7948001e2"
    },
    {
      "path": "addon",
      "mode": "040000",
      "type": "tree",
      "sha": "d0545b5694f428fd072515f914ec5524b296a8f9",
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/trees/d0545b5694f428fd072515f914ec5524b296a8f9"
    },
    {
      "path": "app",
      "mode": "040000",
      "type": "tree",
      "sha": "ecda62ce7dd2836356d88d2dab3cd1cb618ff126",
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/trees/ecda62ce7dd2836356d88d2dab3cd1cb618ff126"
    },
    {
      "path": "blueprints",
      "mode": "040000",
      "type": "tree",
      "sha": "072e4221706337a87f1ed4236021067a54597e4b",
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/trees/072e4221706337a87f1ed4236021067a54597e4b"
    },
    {
      "path": "bower.json",
      "mode": "100644",
      "type": "blob",
      "sha": "48b3448ae914f604c85198abd0bec650dbeed416",
      "size": 146,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/48b3448ae914f604c85198abd0bec650dbeed416"
    },
    {
      "path": "config",
      "mode": "040000",
      "type": "tree",
      "sha": "9b39bd27cb2d371cee92e19fdeb654f3848d7b67",
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/trees/9b39bd27cb2d371cee92e19fdeb654f3848d7b67"
    },
    {
      "path": "docs",
      "mode": "040000",
      "type": "tree",
      "sha": "ae303b977410829ac1ceffcf8a049c925b638f38",
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/trees/ae303b977410829ac1ceffcf8a049c925b638f38"
    },
    {
      "path": "ember-cli-build.js",
      "mode": "100644",
      "type": "blob",
      "sha": "9c7d97cdeeef820be2b8bcec4ad10fe3455603d8",
      "size": 566,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/9c7d97cdeeef820be2b8bcec4ad10fe3455603d8"
    },
    {
      "path": "fastboot-tests",
      "mode": "040000",
      "type": "tree",
      "sha": "5f0f2d55dc1b7de2b74c8cf7086a945bb7c48d3c",
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/trees/5f0f2d55dc1b7de2b74c8cf7086a945bb7c48d3c"
    },
    {
      "path": "gulpfile.js",
      "mode": "100644",
      "type": "blob",
      "sha": "e10b7a3a0aa39079a98ab805d0bd55c255440634",
      "size": 1119,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/e10b7a3a0aa39079a98ab805d0bd55c255440634"
    },
    {
      "path": "index.js",
      "mode": "100644",
      "type": "blob",
      "sha": "37dfeaea3f57bfd842819843b3c8ef64d203244b",
      "size": 1548,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/37dfeaea3f57bfd842819843b3c8ef64d203244b"
    },
    {
      "path": "package.json",
      "mode": "100644",
      "type": "blob",
      "sha": "693d177ea0dbf6ea4c4243a99b20f67947dd94ec",
      "size": 2400,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/693d177ea0dbf6ea4c4243a99b20f67947dd94ec"
    },
    {
      "path": "testem.js",
      "mode": "100644",
      "type": "blob",
      "sha": "26044b2f85947ebf574b80b9d098b17a0c95852e",
      "size": 237,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/26044b2f85947ebf574b80b9d098b17a0c95852e"
    },
    {
      "path": "tests",
      "mode": "040000",
      "type": "tree",
      "sha": "fc7dea6067f4fbcceaecdf5c6c0863350fe62c3b",
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/trees/fc7dea6067f4fbcceaecdf5c6c0863350fe62c3b"
    },
    {
      "path": "vendor",
      "mode": "040000",
      "type": "tree",
      "sha": "391940bb0e1ae45220f68829ecca022812be58ff",
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/trees/391940bb0e1ae45220f68829ecca022812be58ff"
    },
    {
      "path": "yarn.lock",
      "mode": "100644",
      "type": "blob",
      "sha": "c2b631269339dba708adc88f050cf58c5b71e2e7",
      "size": 241152,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/c2b631269339dba708adc88f050cf58c5b71e2e7"
    },
    {
      "path": "yuidoc.json",
      "mode": "100644",
      "type": "blob",
      "sha": "f257a6d585cbb81e26b20852c07d6731437c66a4",
      "size": 269,
      "url": "https://api.github.com/repos/srvance/ember-bootstrap/git/blobs/f257a6d585cbb81e26b20852c07d6731437c66a4"
    }
  ],
  "truncated": false
}
*/
