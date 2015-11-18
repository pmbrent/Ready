window.ApiActions = {
  receiveAllUsers: function(users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  },

  receiveUserShelves: function(user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_SHELVES_RECEIVED,
      user: user
    });
  },

  receiveAllBooks: function(books) {
    AppDispatcher.dispatch({
      actionType: BookConstants.BOOKS_RECEIVED,
      books: books
    });
  }

};
