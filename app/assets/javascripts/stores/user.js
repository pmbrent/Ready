(function(root) {

  _users = [];

  root.UserStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _users.slice();
    }

  });

})(this);
