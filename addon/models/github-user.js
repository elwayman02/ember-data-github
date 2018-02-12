import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import { deprecate } from '@ember/application/deprecations';
import { computed } from '@ember/object';

export default Model.extend({
  login: attr('string'),
  name: attr('string'),
  type: attr('string'),
  avatarUrl: attr('string'),
  htmlUrl: attr('string'),
  publicRepos: attr('number'),
  publicGists: attr('number'),
  followers: attr('number'),
  following: attr('number'),
  createdAt: attr('date'),
  updatedAt: attr('date'),
  url: attr('string'),
  company: attr('string'),
  blog: attr('string'),
  location: attr('string'),
  email: attr('string'),
  bio: attr('string'),

  repositories: hasMany('github-repository'),

  githubRepositories: computed('repositories.[]', function() {
    deprecate('The githubRepositories property on the github-user model has been deprecated.  Please use the repositories property.', false, { id: 'ember-data-github.deprecated-model-props', until: '1.0.0' });
    return this.get('repositories');
  }),
});
