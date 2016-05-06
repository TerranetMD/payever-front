import _ from 'underscore';
import { history } from 'backbone';
import { ItemView } from 'backbone.marionette';
import template from '../templates/header.hbs';

export default ItemView.extend({
  className: 'app__nav',
  template,
  tagName: 'nav',

  attributes: {
    role: 'navigation'
  },

  collectionEvents: {
    all: 'render'
  },

  templateHelpers() {
    return {
      primaryItems: this.serializeWhere({ type: 'primary' }),
      secondaryItems: this.serializeWhere({ type: 'secondary' })
    };
  },

  serializeWhere(props) {
    return _.invoke(this.collection.where(props), 'toJSON');
  },

  ui: {
    collapse: '#navbar-collapse'
  },

  events: {
    'show.bs.collapse #navbar-collapse': 'onCollapseShow'
  },

  onCollapseShow() {
    this.listenToOnce(history, 'route', () => {
      this.ui.collapse.collapse('hide');
    });
  }
});
