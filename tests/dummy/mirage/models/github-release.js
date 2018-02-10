import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  repository: belongsTo('github-repository'),
  author: belongsTo('github-user')
});
