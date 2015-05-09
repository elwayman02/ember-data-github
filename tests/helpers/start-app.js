import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';
import UserFactory from './factories/user';
import OrganizationFactory from './factories/organization';
import RepositoryFactory from './factories/repository';
import BranchFactory from './factories/branch';
import GithubAdapter from 'ember-data-github/adapters/github';
import assertGithubUserOk from './custom-helpers/assert-github-user-ok';
import assertGithubOrganizationOk from './custom-helpers/assert-github-organization-ok';
import assertGithubRepositoryOk from './custom-helpers/assert-github-repository-ok';
import assertGithubBranchOk from './custom-helpers/assert-github-branch-ok';

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
  OrganizationFactory.defineOrganization();
  RepositoryFactory.defineRepository();
  BranchFactory.defineBranch();

  // Pretender doesn't work with fully qualified URLs
  GithubAdapter.reopen({
    // Caution: overriding ember-data private api
    ajax: function(url, type, options) {
      url = url.replace('https://api.github.com','');
      return this._super(url, type, options);
    }
  });

  return application;
}
