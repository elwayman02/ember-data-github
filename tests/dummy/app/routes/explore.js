import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('github-repository', {
      user: 'elwayman02',
      type: 'all'
    });
  }
});
