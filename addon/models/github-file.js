import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  additions: attr('number'),
  blobUrl: attr('string'),
  changes: attr('number'),
  deletions: attr('number'),
  filename: attr('string'),
  patch: attr('string'),
  rawUrl: attr('string'),
  sha: attr('string'),
  status: attr('string')
});
