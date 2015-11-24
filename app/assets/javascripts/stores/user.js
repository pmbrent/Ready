(function(root) {
  CHANGE_EVENT = "change";

  _users = [];
  _searchResults = [];

  root.UserStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _users.slice();
    },

    find: function(userId) {
      return _users.filter(function(user) {
        return user.id === userId;
      })[0];
    },

    search: function(input) {
      input = input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var regex = new RegExp(input);

      _searchResults = _users.filter(function(user) {
        return (regex.test(user.name) || regex.test(user.email));
      });
    },

    results: function() {
      return _searchResults.slice();
    },

    updateUsers: function(newUsers) {
      if (_users.length === 0) {
        _users = newUsers;
        return;
      }

      // Refactor -- sort by id

      newUsers.forEach(function(user) {
        if (!_users.some(function(_user) {
          return _user.id === user.id;
        })) {
          _users.push(user);
        }
      });
    },

    updateUser: function(shelfUser) {
      for (var i = 0, n = _users.length; i < n; i++) {
        if (_users[i].id === shelfUser.id) {
          _users[i] = shelfUser;
          return true;
        }
      }
      _users.push(shelfUser);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case UserConstants.USERS_RECEIVED:
          UserStore.updateUsers(payload.users);
          UserStore.emit(CHANGE_EVENT);
        break;
        case UserConstants.USER_INFO_RECEIVED:
          UserStore.updateUser(payload.user);
          UserStore.emit(CHANGE_EVENT);
        break;
      }

    })

  });

})(this);
