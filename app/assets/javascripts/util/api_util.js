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

  fetchUserShelves: function(userId) {
    $.ajax({
      url: "/users/" + userId,
      method: "GET",
      dataType: "json",
      success: function(user) {
        ApiActions.receiveUserShelves(user);
      }
    });
  },

  fetchBooks: function() {
    $.ajax({
      url: "/books",
      method: "GET",
      dataType: "json",
      success: function(books) {
        ApiActions.receiveAllBooks(books);
      }
    });
  }
};
