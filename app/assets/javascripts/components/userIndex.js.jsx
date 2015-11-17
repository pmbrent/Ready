window.userIndex = React.createClass({
  getInitialState: function() {
    return { users: UserStore.all() };
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this.updateUsers);
    ApiUtil.fetchUsers(showUsers);
  },

  updateUsers: function() {
    this.setState({ users: UserStore.all() });
  },

  render: function() {
    return (
      <div>
        {UserStore.all().map(function(user) {
          return <User user={user}/>;
        })};
      </div>
    );
  }.bind(this)
});
