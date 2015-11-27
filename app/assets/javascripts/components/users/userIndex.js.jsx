window.UserIndex = React.createClass({
  getInitialState: function() {
    return { users: UserStore.all() };
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this.updateUsers);
    ApiUtil.fetchUsers();
  },

  updateUsers: function() {
    this.setState({ users: UserStore.all() });
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this.updateUsers);
  },

  render: function() {
    var uidx = this;
    return (
      <div className="userView view group">
        <div className="sideColumn">
          <div className="sideBox">
            Know someone who'd enjoy the site? We grow best by referrals! Consider passing along a link.
          </div>
        </div>
        <div className="bodyContainer">
          <strong className="strongBar">Users Index</strong>
          <ul className="usersList">
            {uidx.state.users.map(function(user) {
              var userUrl = "#/users/" + user.id;
              return (
                <li key={user.id}><a href={userUrl}>{user.name}</a></li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
});
