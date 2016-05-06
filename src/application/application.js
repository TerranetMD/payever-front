import _ from 'underscore';
import $ from 'jquery';
import nprogress from 'nprogress';
import Backbone from 'backbone';
import { Application } from 'backbone.marionette';
import LayoutView from './views/layout';

nprogress.configure({
  showSpinner: false
});

export default Application.extend({
  initialize() {
    this.$body = $(document.body);
    this.layout = new LayoutView();
    this.layout.render();

    this.listenTo(Backbone, {
      'route:before:enter': this.onRouteBeforeEnter,
      'route:enter': this.onRouteEnter,
      'route:error': this.onRouteError
    });
  },

  onRouteBeforeEnter() {
    this.transitioning = true;

    // Don't show for synchronous route changes
    _.defer(() => {
      if (this.transitioning) {
        nprogress.start();
      }
    });
  },

  onRouteEnter() {
    const scrollY = this.$body.scrollTop();
    this.transitioning = false;

    if (scrollY > 0) {
      this.$body
        .stop()
        .delay(400)
        .animate({ scrollTop: 0 }, 500, 'swing', () => Backbone.trigger('page:top', true));
    } else {
      Backbone.trigger('page:top', false);
    }
    nprogress.done();
  },

  onRouteError() {
    this.transitioning = false;
    nprogress.done(true);
  }
});
