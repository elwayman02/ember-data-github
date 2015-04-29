import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';
import UserFactory from './factories/user-factory';
import GithubAdapter from 'ember-data-github/adapters/github';

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  UserFactory.defineUser();

  // Pretender doesn't work with fully qualified URLs
  GithubAdapter.reopen({ host: 'github-api' });

  return application;
}
