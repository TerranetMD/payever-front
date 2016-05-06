import { Collection } from 'backbone';
import Album from '../models/album';

const API_URL = window.API_URL || '';

export default Collection.extend({
  url: `${API_URL}/albums`,
  model: Album,

  parse(response) {
    return response.data;
  }
});
