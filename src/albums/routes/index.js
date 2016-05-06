import { Route } from 'backbone-routing';
import AlbumsView from '../views/albums';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.collection = options.collection;
  },

  fetch() {
    return this.collection.fetch();
  },

  render() {
    this.view = new AlbumsView({
      collection: this.collection
    });

    this.container.show(this.view);
  }
});
