(function (root) {
  var CHANGE_EVENT = "change";
  var FEED_EVENT = "feed";

  var _currentUser = {};
  var _userFeed = [];

  root.CurrentUserStore = $.extend({}, EventEmitter.prototype, {

    currentUser: function () {
      return $.extend({}, _currentUser);
    },

    isFriend: function(user_id) {
      if (typeof _currentUser.friends === "undefined") {
        return false;
      }
      user_id = parseInt(user_id);
      return _currentUser.friends.some(function(friend) {
        return (friend.id === user_id);
      });
    },

    userFeed: function() {
      return _userFeed.slice();
    },

    currentUserId: function () {
      return $.extend({}, _currentUser).id;
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    addFeedListener: function (callback) {
      this.on(FEED_EVENT, callback);
    },

    removeFeedListener: function (callback) {
      this.removeListener(FEED_EVENT, callback);
    },

    isLoggedIn: function () {
      return (typeof _currentUser !== "undefined" &&
              typeof _currentUser.errors === "undefined" &&
              typeof _currentUser.id !== "undefined");
    },

    dispatcherId: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case CurrentUserConstants.RECEIVE_CURRENT_USER:
          _currentUser = payload.user;
          CurrentUserStore.emit(CHANGE_EVENT);
          break;
        case CurrentUserConstants.RECEIVE_CURRENT_USER_FEED:
          _userFeed = payload.userFeed;
          CurrentUserStore.emit(FEED_EVENT);
          break;
      }
    }),
  });
})(this);
