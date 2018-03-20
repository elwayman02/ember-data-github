import ApplicationSerializer from './addon';

export default ApplicationSerializer.extend({
  include: ['owner']
});
