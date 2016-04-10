import DS from 'ember-data';
import Ember from 'ember';

const { RESTAdapter } = DS;
const { computed, inject } = Ember;

export default RESTAdapter.extend({

  session: inject.service('github-session'),

  host: 'https://api.github.com',

  headers: computed('session.githubAccessToken', function () {
    let headers = {};
    if (this.get('session.githubAccessToken')) {
      headers.Authorization = `token ${this.get('session.githubAccessToken')}`;
    }
    return headers;
  }),

  pathForType(type) {
    return Ember.String.camelize(Ember.String.pluralize(type.replace('github', '')));
  }

});
