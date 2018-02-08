import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import config from 'dummy/config/environment';

export default Controller.extend({
  session: service(),
  config: config.torii.providers['github-oauth2']
})
