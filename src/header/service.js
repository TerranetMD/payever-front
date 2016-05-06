import Service from 'backbone.service';
import { Collection } from 'backbone';
import HeaderView from './views/header';

const HeaderService = Service.extend({
  setup(options = {}) {
    this.container = options.container;
  },

  start() {
    this.collection = new Collection();
    this.view = new HeaderView({
      collection: this.collection
    });
    this.container.show(this.view);
  },

  requests: {
    add: 'add',
    remove: 'remove',
    activate: 'activate'
  },

  add(model) {
    this.collection.add(model);
  },

  remove(attrs) {
    const model = this.collection.findWhere(attrs);
    if (model) {
      this.collection.remove(model);
    }
  },

  activate(attrs) {
    this.collection.invoke('set', 'active', '');
    const model = this.collection.findWhere(attrs);

    if (model) {
      model.set('active', 'active');
    }
  }
});

export default new HeaderService();
