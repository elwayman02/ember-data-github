import { inject as service } from '@ember/service';
import { camelize } from '@ember/string';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import DS from 'ember-data';
import { pluralize } from 'ember-inflector';

const { RESTAdapter } = DS;

export default RESTAdapter.extend({

  session: service('github-session'),

  host: 'https://api.github.com',

  headers: computed('session.githubAccessToken', function () {
    let headers = {};
    if (this.get('session.githubAccessToken')) {
      headers.Authorization = `token ${this.get('session.githubAccessToken')}`;
    }
    return headers;
  }),

  pathForType(type) {
    return camelize(pluralize(type.replace('github', '')));
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
    const linkHeader = headers.link;
    const result = this._super(status, headers, payload, requestData);
    if (isNone(linkHeader)) {
      return result;
    }

    const links = linkHeader.split(', ').reduce((memo, link) => {
      let [url, rel] = link.split('; ');

      try {
        [, url] = url.match(/<(.+)>/);
        //eslint-disable-next-line no-useless-escape
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
