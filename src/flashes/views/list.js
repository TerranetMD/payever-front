import { CollectionView } from 'backbone.marionette';
import AlertView from './alert';

export default CollectionView.extend({
  childView: AlertView,
  className: 'container'
});
