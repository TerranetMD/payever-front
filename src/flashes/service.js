import Service from 'backbone.service';
import AlertsCollection from './collections/alerts';
import ListView from './views/list';

const FlashesService = Service.extend({
  setup(options = {}) {
    this.container = options.container;
  },

  start() {
    this.collection = new AlertsCollection();
    this.view = new ListView({
      collection: this.collection
    });
    this.container.show(this.view);
  },

  requests: {
    add: 'add',
    remove: 'remove',
  },

  add(model) {
    this.collection.add(model);
  },

  remove(attrs) {
    const model = this.collection.findWhere(attrs);

    if (model) {
      model.destroy();
    }
  }
});

export default new FlashesService();
