window.SessionActions = {
  receiveCurrentUser: function(user) {
    AppDispatcher.dispatch({
      actionType: CurrentUserConstants.RECEIVE_CURRENT_USER,
      user: user
    });
  },

  receiveCurrentUserFeed: function(feed) {
    AppDispatcher.dispatch({
      actionType: CurrentUserConstants.RECEIVE_CURRENT_USER_FEED,
      userFeed: feed
    });
  }
};
