/* eslint-env node */
'use strict';

const path = require('path');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-data-github',

  included(app) {
    this.addonConfig = this.app.project.config(app.env)['ember-cli-mirage'] || {};
    this.mirageSupportDirectory = path.join(this.root, 'mirage-support');

    this._super.included.apply(this, arguments);
  },

  treeForApp(appTree) {
    var trees = [appTree];

    if (this._shouldIncludeMirageFiles()) {
      let mirageFolderName = 'mirage-support';
      let mirageOptions = this.app.options[mirageFolderName];
      let isDummyApp = this.app.name === 'dummy';

      if (isDummyApp || mirageOptions) {
        if (isDummyApp || mirageOptions.includeAll) {
          trees.push(new Funnel(this.mirageSupportDirectory, {
            destDir: 'mirage',
            exclude: mirageOptions && mirageOptions.exclude || []
          }));
        } else if (mirageOptions.include) {
          trees.push(new Funnel(this.mirageSupportDirectory, {
            destDir: 'mirage',
            include: mirageOptions.include
          }));
        }
      }
    }

    return new MergeTrees(trees, {
      overwrite: true
    });
  },

  _shouldIncludeMirageFiles() {
    if (process.env.EMBER_CLI_FASTBOOT) {
      return false;
    }

    let enabledInProd = this.app.env === 'production' && this.addonConfig.enabled,
      explicitExcludeFiles = this.addonConfig.excludeFilesFromBuild;

    return enabledInProd || (this.app.env !== 'production' && explicitExcludeFiles !== true);//eslint-disable-line
  }
};
