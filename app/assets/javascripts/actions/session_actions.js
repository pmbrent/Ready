window.SessionActions = {
  receiveCurrentUser: function(user) {
    AppDispatcher.dispatch({
      actionType: CurrentUserConstants.RECEIVE_CURRENT_USER,
      user: user
    });
  }
};
