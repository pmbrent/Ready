window.ApiUtil = {

  fetchUsers: function() {
    $.ajax({
      url: "/users",
      method: "GET",
      dataType: "json",
      success: function(users) {
        ApiActions.receiveAllUsers(users);
      }
    });
  },

  fetchUserInfo: function(userId) {
    $.ajax({
      url: "/users/" + userId,
      method: "GET",
      dataType: "json",
      success: function(user) {
        ApiActions.receiveUserInfo(user);
      }
    });
  },

  fetchUserRecommendations: function(userId) {
    $.ajax({
      url: "/recommendations/" + userId,
      method: "GET",
      dataType: "json",
      success: function(recommendations) {
        ApiActions.receiveUserRecommendations(recommendations);
      }
    });
  },

  fetchBooks: function(onSuccess) {
    $.ajax({
      url: "/books",
      method: "GET",
      dataType: "json",
      success: function(books) {
        ApiActions.receiveAllBooks(books);
        if (onSuccess) {
          onSuccess();
        }
      }
    });
  },

  shelveBook: function(bookId, shelfId) {
    $.ajax({
      url: "/shelvings",
      method: "POST",
      dataType: "json",
      data: {
        shelving: {
          book_id: bookId,
          shelf_id: shelfId
        }
      }
    });
  },

  unshelveBook: function(bookId, shelfId, userId) {
    $.ajax({
      url: "/shelvings",
      method: "DELETE",
      dataType: "json",
      data: {
        shelving: {
          book_id: bookId,
          shelf_id: shelfId
        }
      },
      success: function() {
        ApiUtil.fetchUserInfo(userId);
      }
    });
  },

  rateBook: function(bookId, rating) {
    $.ajax({
      url: "/ratings",
      method: "POST",
      dataType: "json",
      data: {
        rating: {
          book_id: bookId,
          rating: rating
        }
      },
      success: function() {
        ApiUtil.fetchBooks();
      }
    });
  },

  unrateBook: function(bookId) {
    $.ajax({
      url: "/ratings",
      method: "DELETE",
      dataType: "json",
      data: {
        rating: {
          book_id: bookId
        }
      },
      success: function() {
        ApiUtil.fetchBooks();
      }
    });
  },

};
