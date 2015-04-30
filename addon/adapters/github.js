import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  session: Ember.inject.service(),
  host: 'https://api.github.com',
  headers: Ember.computed('session.githubAccessToken', function() {
    return {
      Authorization: `token ${this.get('session.githubAccessToken')}`,
    };
  }),
  pathForType: function(type) {
    return Ember.String.camelize(Ember.String.pluralize(type.replace('github','')));
  }
});
