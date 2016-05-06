import _ from 'underscore';
import $ from 'jquery';
import { LayoutView } from 'backbone.marionette';
import { Collection, history } from 'backbone';
import ListView from './pictures-list';
import template from '../templates/pictures.hbs';

export default LayoutView.extend({
  className: 'pictures--index container',
  template,

  regions: {
    list: '.pictures'
  },

  ui: {
    pager: '.btn-pager'
  },

  events: {
    'click @ui.pager': 'pager'
  },

  initialize(options = {}) {
    this.albumId = options.albumId;
    this.state = { start: 0, limit: 20, total: 0 };
    this.state.start = (options.page - 1) * this.state.limit;
  },

  onBeforeRender() {
    const { paginator } = this.collection;

    this.state.limit = paginator.numItemsPerPage;
    this.state.total = paginator.totalCount;
    this.state.current = paginator.currentPageNumber;
  },

  onAttach() {
    this.listView = new ListView({
      collection: this.collection
    });

    this.list.show(this.listView);
  },

  pager(event) {
    const $btn = $(event.currentTarget);
    const page = parseInt($btn.data('page'), 10);

    $btn
      .prop('disabled', true)
      .removeClass('btn-pager--start')
      .addClass('btn-pager--loading');

    _.delay(() => {
      history.navigate(`album/${this.albumId}/page/${page}`, { trigger: true });
    }, 1000);
  },

  templateHelpers() {
    const { current } = this.state;
    const total = Math.ceil(this.state.total / this.state.limit);
    const prev = current > 1 ? current - 1 : false;
    const next = current < total ? current + 1 : false;

    return { total, current, prev, next };
  }
});
