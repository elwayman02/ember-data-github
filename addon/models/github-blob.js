import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  sha: attr('string'),
  url: attr('string'),
  content: attr('string'),
  encoding: attr('string'),
  size: attr('number')
});
