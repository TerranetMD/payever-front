import { Model } from 'backbone';

export default Model.extend({
  urlRoot: '/api/albums',

  defaults: {
    active: false
  }
});
