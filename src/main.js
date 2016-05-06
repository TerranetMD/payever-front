import './main.scss';
import './plugins';
import $ from 'jquery';
import Backbone from 'backbone';
import Application from './application/application';
import HeaderService from './header/service';
import FlashesService from './flashes/service';
import AlbumsRouter from './albums/router';

const app = new Application();

HeaderService.setup({
  container: app.layout.header
});

FlashesService.setup({
  container: app.layout.flashes
});

$(document).ajaxError((event, request, settings) => {
  FlashesService.request('add', {
    type: 'danger',
    title: `Error requesting page: ${settings.url}`
  });
});

app.albums = new AlbumsRouter({
  container: app.layout.content
});

Backbone.history.start();
