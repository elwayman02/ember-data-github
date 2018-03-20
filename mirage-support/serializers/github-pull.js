import EmberDataGithubSerializer from './ember-data-github';

export default EmberDataGithubSerializer.extend({
  include: ['user']
});
