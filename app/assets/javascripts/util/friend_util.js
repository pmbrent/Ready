window.FriendUtil = {

  createFriendship: function(user_id) {
    $.ajax({
      url: "/friendships",
      method: "POST",
      dataType: "json",
      data: {
        id: user_id
      },
      success: function() {
        SessionsUtil.fetchCurrentUser();
      }
    });
  },

  destroyFriendship: function(user_id) {
    $.ajax({
      url: "/friendships/" + user_id,
      method: "DELETE",
      dataType: "json",
      success: function() {
        SessionsUtil.fetchCurrentUser();
      }
    });
  }

};
