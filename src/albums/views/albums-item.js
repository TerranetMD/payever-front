import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import { ItemView } from 'backbone.marionette';
import template from '../templates/albums-item.hbs';

const PIXEL_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

export default ItemView.extend({
  className: 'album',
  tagName: 'a',
  template,

  ui: {
    pictures: '.album__picture',
    images: '.album__picture img'
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

    this.covers = this.model.get('covers');
  },

  attributes() {
    return {
      href: `#album/${this.model.get('id')}`
    };
  },

  templateHelpers() {
    return {
      pixel: PIXEL_IMAGE,
      count: this.count(),
      covers: {
        main: this.coverRange(1),
        rest: this.coverRange()
      }
    };
  },

  getCovers() {
    return this.covers;
  },

  coverRange(len = 0) {
    return this.covers.splice(0, len || this.covers.length);
  },

  count() {
    return this.model.get('count').toLocaleString();
  },

  updatePicuresSize() {
    this.ui.pictures.each((i, el) => {
      const img = el.querySelector('img');

      if (img) {
        const rect = el.getBoundingClientRect();
        const size = Math.round(rect.width);

        img.width = img.height = size;
      }
    });
  },

  unveilImages() {
    if (!this.canUnveilImages || this.imagesUnveiled) {
      return;
    }

    this.imagesUnveiled = true;
    this.ui.images.unveil(200, function onReveal() {
      const $img = $(this);
      $img.load(() => $img.parent().removeClass('album__picture--busy').addClass('album__picture--ready'));
    });
  },

  onShow() {
    this.updatePicuresSize();
    this.unveilImages();
  },

  modelEvents: {
    all: 'render'
  }
});
