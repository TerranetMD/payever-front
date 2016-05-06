import { CollectionView } from 'backbone.marionette';
import ItemView from './albums-item';

export default CollectionView.extend({
  className: 'albums__grid',
  childView: ItemView
});
