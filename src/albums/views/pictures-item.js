import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';
import { ItemView } from 'backbone.marionette';
import template from '../templates/pictures-item.hbs';

const PIXEL_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

export default ItemView.extend({
  className: 'picture',
  tagName: 'figure',
  template,

  ui: {
    picture: '.picture__image',
    image: '.picture__image img'
  },

  initialize() {
    this.listenTo(Backbone, 'page:top', (delayed) => {
      this.canUnveilImages = true;

      if (delayed) {
        _.delay(::this.unveilImages, 300);
      } else {
        this.unveilImages();
      }
    });
  },

  templateHelpers() {
    return {
      pixel: PIXEL_IMAGE
    };
  },

  updateImageSize() {
    const img = this.ui.image.get(0);

    if (img) {
      const rect = this.$el.get(0).getBoundingClientRect();
      const size = Math.round(rect.width);

      img.width = img.height = size;
    }
  },

  unveilImages() {
    if (!this.canUnveilImages || this.imagesUnveiled) {
      return;
    }

    this.imagesUnveiled = true;
    this.ui.image.unveil(200, function onReveal() {
      const $img = $(this);
      $img.load(() => $img.parent().removeClass('picture__image--busy').addClass('picture__image--ready'));
      $img.error(() => $img.parent().removeClass('picture__image--busy').addClass('picture__image--fail'));
    });
  },

  onShow() {
    this.updateImageSize();
    this.unveilImages();
  },

  modelEvents: {
    all: 'render'
  }
});
