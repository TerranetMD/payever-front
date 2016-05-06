import { Model, history } from 'backbone';

export default Model.extend({
  defaults: {
    timeout: false,
    dismissible: true,
    clearOnRoute: true
  },

  initialize() {
    if (this.get('timeout') !== false) {
      this.setTimeout();
    }

    this.on('destroy', this.clearTimeout);

    if (this.get('clearOnRoute')) {
      this.listenTo(history, 'route', this.destroy);
    }
  },

  setTimeout() {
    this.timeoutId = setTimeout(::this.destroy, this.get('timeout'));
  },

  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      delete this.timeoutId;
    }
  }
});
