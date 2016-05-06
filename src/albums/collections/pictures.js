import { Collection } from 'backbone';
import Picture from '../models/picture';

const API_URL = window.API_URL || '';

export default Collection.extend({
  model: Picture,

  initialize(models, options = {}) {
    this.props = {
      page: options.page || 1,
      id: options.id
    };
  },

  url() {
    return `${API_URL}/album/${this.props.id}/pictures?page=${this.props.page}`;
  },

  parse(response) {
    this.paginator = response.paginator;
    return response.data;
  }
});
