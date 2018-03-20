import ApplicationSerializer from './addon';
import { underscore } from '@ember/string';

export default ApplicationSerializer.extend({
  include: ['mergeBaseCommit', 'baseCommit', 'files', 'commits'],

  keyForEmbeddedRelationship(attributeName) {
    return underscore(attributeName)
  }
});
