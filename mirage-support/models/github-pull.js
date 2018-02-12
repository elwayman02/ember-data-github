import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  repository: belongsTo('github-repository'),
  user: belongsTo('github-user')
});
