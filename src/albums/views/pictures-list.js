import { CollectionView } from 'backbone.marionette';
import ItemView from './pictures-item';

export default CollectionView.extend({
  className: 'pictures__grid',
  childView: ItemView
});
