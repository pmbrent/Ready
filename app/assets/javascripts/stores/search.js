(function(root) {
  CHANGE_EVENT = "change";

  _results = [];

  root.SearchStore = $.extend({}, EventEmitter.prototype, {

    results: function() {
      return _results.slice();
    },

    total: function() {
      return _results.total_count || 0;
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case SearchConstants.USERS_RECEIVED:
          _results = payload.users;
          SearchStore.emit(CHANGE_EVENT);
        break;
        case SearchConstants.BOOKS_RECEIVED:
          _results = payload.books;
          SearchStore.emit(CHANGE_EVENT);
        break;
      }

    })

  });

})(this);
