import _ from 'underscore';
import $ from 'jquery';
import { LayoutView } from 'backbone.marionette';
import { Collection, history } from 'backbone';
import ListView from './albums-list';
import template from '../templates/albums.hbs';

export default LayoutView.extend({
  className: 'albums--index container',
  template,

  regions: {
    list: '.albums'
  },

  onAttach() {
    this.listView = new ListView({
      collection: this.collection
    });

    this.list.show(this.listView);
  }
});
