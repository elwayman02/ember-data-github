import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  number: attr('number'),
  title: attr('string'),
  state: attr('string'),
  htmlUrl: attr('string'),
  body: attr('string'),
  createdAt: attr('date'),
  updatedAt: attr('date'),
  closedAt: attr('date'),
  mergedAt: attr('date'),
  userLogin: attr('string'),
  userAvatarUrl: attr('string'),

  user: belongsTo('githubUser', { inverse: null })
});
