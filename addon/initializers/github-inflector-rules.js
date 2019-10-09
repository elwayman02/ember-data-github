import Inflector from 'ember-inflector';

export function initialize() {
  const inflector = Inflector.inflector;
  inflector.uncountable('githubRepositoryContents');
}

export default {
  name: 'github-inflector-rules',
  initialize
};
