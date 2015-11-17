(function(root) {

  _books = [];
  CHANGE_EVENT = "change";

  root.BookStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _books.slice();
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case BookConstants.BOOKS_RECEIVED:
          _books = payload.books;
          BookStore.emit(CHANGE_EVENT);
        break;
      }

    })

  });

})(this);
