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
    //REFACTOR
    $.ajax({
      url: "/shelvings/0",
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
  }
};
