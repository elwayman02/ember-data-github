import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  login: attr('string'),
  avatarUrl: attr('string'),
  gravatarId: attr('string'),
  type: attr('string'),
  siteAdmin: attr('boolean'),
  url: attr('string')
});
