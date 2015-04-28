/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import(app.bowerDirectory + '/FakeXMLHttpRequest/fake_xml_http_request.js', { type: 'test' });
app.import(app.bowerDirectory + '/route-recognizer/dist/route-recognizer.js', { type: 'test' });
app.import(app.bowerDirectory + '/pretender/pretender.js', { type: 'test' });

app.import(app.bowerDirectory + '/rosie/src/rosie.js', { type: 'test' });

module.exports = app.toTree();
