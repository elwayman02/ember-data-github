import Component from '@ember/component';
import layout from '../templates/components/models-list';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);

    this.models = [];
  },

  didInsertElement() {
    this._super(...arguments);

    let adapter = getOwner(this).lookup('data-adapter:main');
    this.set('models', adapter.getModelTypes());

    this.get('models').forEach((type) => {
      let { klass } = type;

      type['keys'] = A(['id']);

      klass.eachAttribute((key) => {
        type['keys'].push(key);
      });
    })

  }
});
