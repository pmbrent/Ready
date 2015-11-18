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

  render: function() {
    var uidx = this;
    return (
      <div>
        {uidx.state.users.map(function(user) {
          return (<User id={user.id} user={user}/>);
        })};
      </div>
    );
  }
});
