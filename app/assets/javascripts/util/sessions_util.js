var SessionsUtil = {
  login: function (credentials, onSuccess) {
    $.ajax({
      url: '/session',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      success: function (currentUser) {
        console.log("logged in!");
        SessionActions.receiveCurrentUser(currentUser);
        if (onSuccess) {
          onSuccess();
        }
      }
    });
  },

  logout: function (onSuccess) {
    $.ajax({
      url: '/session',
      type: 'DELETE',
      dataType: 'json',
      success: function () {
        console.log("logged out!");
        SessionActions.receiveCurrentUser({});
        if (onSuccess) {
          onSuccess();
        }
      }
    });
  },

  fetchCurrentUser: function () {
    $.ajax({
      url: '/session',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
      }
    });
  },

  createUser: function(credentials, onSuccess) {
    $.ajax({
      url: '/users',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      success: function(user) {
        SessionActions.receiveCurrentUser(user);
        if (onSuccess) {
          onSuccess();
        }
      }
    });
  }

};
