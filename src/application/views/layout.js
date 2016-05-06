import { LayoutView } from 'backbone.marionette';
import template from '../templates/layout.hbs';

export default LayoutView.extend({
  el: '.app',
  template,

  regions: {
    header: '.app__header',
    flashes: '.app__flashes',
    content: '.app__content',
    overlay: '.app__overlay'
  }
});
