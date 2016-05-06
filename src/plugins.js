import $ from 'jquery';
import Backbone from 'backbone';

Backbone.$ = $;

import Marionette from 'backbone.marionette';
import { Route } from 'backbone-routing';
// import 'backbone.syphon';
// import 'backbone-query-parameters';
import 'babel-polyfill';

const origRouteTrigger = Route.prototype.trigger;

Route.prototype.trigger = function routeTrigger(eventName, ...args) {
  Backbone.trigger(eventName.split(' ').map(s => `route:${s}`).join(' '), ...args);
  origRouteTrigger(eventName, ...args);
};

// start the marionette inspector
if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}

/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */
$.fn.unveil = function Unveil(threshold, callback) {
  const $w = $(window);
  const th = threshold || 0;
  const retina = window.devicePixelRatio > 1;
  const attrib = retina ? 'data-src-retina' : 'data-src';
  let images = this;
  let loaded;

  this.one('unveil', function onUnveil() {
    let source = this.getAttribute(attrib);

    source = source || this.getAttribute('data-src');

    if (source) {
      this.setAttribute('src', source);

      if (typeof callback === 'function') {
        callback.call(this);
      }
    }
  });

  function unveil() {
    const inview = images.filter(function onImage() {
      const $e = $(this);

      if ($e.is(':hidden')) {
        return false;
      }

      const wt = $w.scrollTop();
      const wb = wt + $w.height();
      const et = $e.offset().top;
      const eb = et + $e.height();

      return eb >= wt - th && et <= wb + th;
    });

    loaded = inview.trigger('unveil');
    images = images.not(loaded);
  }

  $w.on('scroll.unveil resize.unveil lookup.unveil', unveil);
  unveil();
  return this;
};
