import EmberDataGithubSerializer from './ember-data-github';
import { underscore } from '@ember/string';

export default EmberDataGithubSerializer.extend({
  include: ['mergeBaseCommit', 'baseCommit', 'files', 'commits'],

  keyForEmbeddedRelationship(attributeName) {
    return underscore(attributeName)
  }
});
