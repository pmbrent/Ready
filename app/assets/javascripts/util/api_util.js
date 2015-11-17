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

  fetchBooks: function() {
    $.ajax({
      url: "/books",
      method: "GET",
      dataType: "json",
      success: function(users) {
        ApiActions.receiveAllBooks(books);
      }
    });
  }

};
