(function(root) {

  _users = [];
  CHANGE_EVENT = "change";

  root.UserStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _users.slice();
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case UserConstants.USERS_RECEIVED:
          _users = payload.users;
          UserStore.emit(CHANGE_EVENT);
        break;
      }

    })

  });

})(this);
