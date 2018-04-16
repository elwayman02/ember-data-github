import attr from 'ember-data/attr';
import Model from 'ember-data/model';

export default Model.extend({
  content: attr('string'),
  downloadUrl: attr('string'),
  encoding: attr('string'),
  gitUrl: attr('string'),
  htmlUrl: attr('string'),
  name: attr('string'),
  path: attr('string'),
  sha: attr('string'),
  size: attr('number'),
  type: attr('string'),
  url: attr('string')
});
