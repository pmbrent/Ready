(function(root) {
  CHANGE_EVENT = "change";

  _books = [];
  _searchResults = [];

  root.BookStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _books.slice();
    },

    find: function(bookId) {
      return _books.filter(function(book) {
        return book.id === bookId;
      })[0];
    },

    search: function(input) {
      var regex;

      if (parseInt(input).isNaN) {
      input = input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      regex = newRegExp("^" + input);
        _searchResults = _books.filter(function(book) {
          return (regex.test(book.author) || regex.text(book.title));
        });
      } else {
        regex = new RegExp("^" + input);
        _searchResults = _books.filter(function(book) {
          return regex.test(book.isbn);
        });
      }
    },

    results: function() {
      return _searchResults.slice();
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
