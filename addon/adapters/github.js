import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  session: Ember.inject.service(),
  host: 'https://api.github.com',
  headers: Ember.computed('session.githubAccessToken', function() {
    var headers = {};
    if(this.get('session.githubAccessToken')) {
      headers.Authorization = `token ${this.get('session.githubAccessToken')}`;
    }
    return headers;
  }),
  pathForType: function(type) {
    return Ember.String.camelize(Ember.String.pluralize(type.replace('github','')));
  }
});
