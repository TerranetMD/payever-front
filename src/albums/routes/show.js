import { Route } from 'backbone-routing';
import PicturesView from '../views/pictures';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.collection = options.collection;
  },

  fetch() {
    return this.collection.fetch();
  },

  render(id, page) {
    this.view = new PicturesView({
      collection: this.collection,
      page: page && parseInt(page, 10) || 1,
      albumId: parseInt(id, 10)
    });

    this.container.show(this.view);
  }
});
