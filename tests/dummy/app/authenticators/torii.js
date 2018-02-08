import { inject as service } from '@ember/service';
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import config from 'dummy/config/environment'

export default ToriiAuthenticator.extend({
  torii: service(),
  ajax: service(),

  authenticate() {
   const ajax = this.get('ajax');
   const tokenExchangeUri = config.torii.providers['github-oauth2'].tokenExchangeUri;

   return this._super(...arguments).then((data) => {
     return ajax.request(tokenExchangeUri, {
       type: 'POST',
       crossDomain: true,
       dataType: 'json',
       contentType: 'application/json',
       data: JSON.stringify({
         authorizationCode: data.authorizationCode
       })
     }).then( (response) => {
       return {
         access_token: JSON.parse(response).access_token,
         provider: data.provider
       };
     });
   });
 }
});
