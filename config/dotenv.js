/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function(/* env */) {
  return {
    path: path.join(__dirname, '..', '.env')
  };
};
