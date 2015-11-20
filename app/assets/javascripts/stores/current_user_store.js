(function (root) {
  var CHANGE_EVENT = "change";

  var _currentUser = {};

  root.CurrentUserStore = $.extend({}, EventEmitter.prototype, {

    currentUser: function () {
      return $.extend({}, _currentUser);
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    isLoggedIn: function () {
      return (typeof _currentUser !== "undefined" &&
              typeof _currentUser.id !== "undefined");
    },

    dispatcherId: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case CurrentUserConstants.RECEIVE_CURRENT_USER:
          _currentUser = payload.user;
          CurrentUserStore.emit(CHANGE_EVENT);
          break;

      }
    }),
  });
})(this);
