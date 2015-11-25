var SessionsUtil = {
  login: function (credentials, callback) {
    $.ajax({
      url: '/session',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        if (callback) {
          callback();
        }
      }
    });
  },

  logout: function (callback) {
    $.ajax({
      url: '/session',
      type: 'DELETE',
      dataType: 'json',
      success: function () {
        SessionActions.receiveCurrentUser({});
        if (callback) {
          callback();
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

  createUser: function(credentials, callback) {
    $.ajax({
      url: '/users',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      success: function(user) {
        SessionActions.receiveCurrentUser(user);
        if (callback) {
          callback();
        }
      }
    });
  },

  fetchCurrentUserFeed: function() {
    $.ajax({
      url: '/users/feed',
      type: 'GET',
      success: function(feed) {
        SessionActions.receiveCurrentUserFeed(feed);
      }
    });
  }

};
