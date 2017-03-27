import Route from 'ember-route';

export default Route.extend({
  model() {
    return this.store.find('github-gist', '461eaf2d909349fe69a3586644ad8c4a');
  }
});
