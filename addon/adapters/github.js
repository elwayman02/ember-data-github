import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  session: Ember.inject.service(),
  host: 'https://api.github.com',
  headers: Ember.computed('session.githubToken', function() {
    return {
      Authorization: `token ${this.get('session.githubToken')}`,
    };
  }),
  pathForType: function(type) {
    return Ember.String.camelize(type.replace('github',''));
  }
});
