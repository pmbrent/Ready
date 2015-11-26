window.ApiActions = {
  receiveAllUsers: function(users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  },

  receiveUserInfo: function(user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_INFO_RECEIVED,
      user: user
    });
  },

  receiveSearchedUsers: function(users) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.USERS_RECEIVED,
      users: users
    });
  },

  receiveSearchedBooks: function(books) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.BOOKS_RECEIVED,
      books: books
    });
  },

  receiveAllBooks: function(books) {
    AppDispatcher.dispatch({
      actionType: BookConstants.BOOKS_RECEIVED,
      books: books
    });
  },

  receiveUserRecommendations: function(recommendations) {
    AppDispatcher.dispatch({
      actionType: RecommendationConstants.RECOMMENDATIONS_RECEIVED,
      recommendations: recommendations
    });
  }

};
