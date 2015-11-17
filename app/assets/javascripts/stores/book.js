(function(root) {

  _books = [];

  root.UserStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _books.slice();
    }

  });

})(this);
