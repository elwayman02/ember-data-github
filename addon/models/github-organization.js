import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import { deprecate } from '@ember/application/deprecations';
import { computed } from '@ember/object';

export default Model.extend({
  login: attr('string'),
  name: attr('string'),
  avatarUrl: attr('string'),

  members: hasMany('github-member'),
  repositories: hasMany('github-repository'),

  githubUsers: computed('members.[]', function() {
    deprecate('The githubUsers property on the github-organization model has been deprecated.  Please use the members property.', false, { id: 'ember-data-github.deprecated-model-props', until: '1.0.0' });
    return this.get('members');
  }),
  githubRepositories: computed('repositories.[]', function() {
    deprecate('The githubRepositories property on the github-organization model has been deprecated.  Please use the repositories property.', false, { id: 'ember-data-github.deprecated-model-props', until: '1.0.0' });
    return this.get('repositories');
  })
});
