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
        return book.id == bookId;
      })[0];
    },

    search: function(input) {
      input = input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var regex = new RegExp(input);

      if (isNaN(parseInt(input))) {
        _searchResults = _books.filter(function(book) {
          return (regex.test(book.author) || regex.test(book.title));
        });
      } else {
        _searchResults = _books.filter(function(book) {
          return regex.test(book.isbn);
        });
      }
    },

    rated: function() {
      return _books.filter(function(book) {
        return (!isNaN(parseInt(book.rating)));
      });
    },

    popular: function(num) {
      return _books.slice(0,num);
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
