import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  sha: attr('string'),
  url: attr('string'),
  parents: attr(),
  commit: attr(),
  author: attr(),
  committer: attr()
});
