import DS from 'ember-data';
import Ember from 'ember';

const { RESTAdapter } = DS;
const { computed, inject, isNone } = Ember;

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
  },

  // Parse Link response header out into an object like:
  //   {
  //     first: 'https://api.github.com/resouce?page=1&per_page=5',
  //     next:  'https://api.github.com/resouce?page=3&per_page=5',
  //     prev:  'https://api.github.com/resouce?page=1&per_page=5',
  //     last:  'https://api.github.com/resouce?page=4&per_page=5',
  //   }
  //
  handleResponse(status, headers, payload, requestData) {
    const linkHeader = headers.Link;
    const result = this._super(status, headers, payload, requestData);
    if (isNone(linkHeader)) {
      return result;
    }

    const links = linkHeader.split(', ').reduce((memo, link) => {
      let [url, rel] = link.split('; ');

      try {
        [, url] = url.match(/<(.+)>/);
        [, rel] = rel.match(/rel=\"(.+)\"/);
      } catch(error) {
        // Any error in parsing should not cause the application to error
        return;
      }

      memo[rel] = url;
      return memo;
    }, {});

    result.links = links;
    return result;
  }
});
