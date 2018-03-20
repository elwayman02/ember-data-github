import { RestSerializer } from 'ember-cli-mirage';
import { underscore } from '@ember/string';

export default RestSerializer.extend({
  root: false,
  embed: true,

  keyForAttribute(attr) {
    return underscore(attr);
  }
});
