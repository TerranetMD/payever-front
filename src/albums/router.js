import $ from 'jquery';
import { Router } from 'backbone-routing';
import HeaderService from '../header/service';
import IndexRoute from './routes/index';
import ShowRoute from './routes/show';
import AlbumsCollection from './collections/albums';
import PicturesCollection from './collections/pictures';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.listenTo(this, {
      'before:enter': this.onBeforeEnter,
      'route:index': () => {
        $('.app__logo').removeClass('app__logo--closable');
      },
      'route:show': () => {
        $(() => {
          $('.app__logo').addClass('app__logo--closable');
        });
      }
    });

    HeaderService.request('add', {
      name: 'Albums',
      path: '',
      type: 'primary'
    });
  },

  onBeforeEnter() {
    HeaderService.request('activate', {
      path: ''
    });
  },

  routes: {
    '': 'index',
    'album/:id': 'show',
    'album/:id/page/:page': 'show'
  },

  index() {
    return new IndexRoute({
      collection: new AlbumsCollection(),
      container: this.container
    });
  },

  show(id, page = 1) {
    return new ShowRoute({
      collection: new PicturesCollection([], { id, page }),
      container: this.container
    });
  }
});
