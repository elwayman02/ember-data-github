/* eslint-env node */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */
  app.import(app.bowerDirectory + '/FakeXMLHttpRequest/fake_xml_http_request.js', { type: 'test' });
  app.import(app.bowerDirectory + '/route-recognizer/dist/route-recognizer.js', { type: 'test' });
  app.import(app.bowerDirectory + '/pretender/pretender.js', { type: 'test' });

  app.import(app.bowerDirectory + '/rosie/src/rosie.js', { type: 'test' });

  return app.toTree();
};
