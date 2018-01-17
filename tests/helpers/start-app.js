import Application from '../../app';
import config from '../../config/environment';
import { merge } from '@ember/polyfills';
import { run } from '@ember/runloop';

import './custom-helpers/assert-github-branch-ok';
import './custom-helpers/assert-github-organization-ok';
import './custom-helpers/assert-github-repository-ok';
import './custom-helpers/assert-github-user-ok';
import './custom-helpers/assert-github-release-ok';
import './custom-helpers/assert-github-blob-ok';
import './custom-helpers/assert-github-tree-ok';

export default function startApp(attrs) {
  let attributes = merge({}, config.APP);
  attributes.autoboot = true;
  attributes = merge(attributes, attrs); // use defaults, but you can override;

  return run(() => {
    let application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();

    return application;
  });
}
