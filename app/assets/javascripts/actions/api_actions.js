window.ApiActions = {
  receiveAllUsers: function(users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  },

  receiveAllBooks: function(books) {
    AppDispatcher.dispatch({
      actionType: BookConstants.BOOKS_RECEIVED,
      books: books
    });
  }

};
