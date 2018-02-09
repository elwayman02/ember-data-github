import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  login: attr('string'),
  name: attr('string'),
  avatarUrl: attr('string'),

  members: hasMany('github-member', { inverse: null }),
  repositories: hasMany('github-repository')
});
