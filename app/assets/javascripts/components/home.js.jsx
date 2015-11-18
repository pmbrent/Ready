window.Home = React.createClass({

  getInitialState: function() {
    return ({ user: UserStore.find(window.currentUserId) });
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this.updateUser);
    ApiUtil.fetchUsers();
  },

  updateUser: function() {
    this.setState({ user: UserStore.find(window.currentUserId) });
  },

  userPage: function() {
    if (typeof this.state.user === "undefined") {
      return <div/>;
    } else {
      return <ShelfIndex user={this.state.user}/>;
    }
  },

  render: function() {
    return (
      <div className="coming_soon">
        Welcome! More is coming soon!
        {this.userPage()}
        {this.props.children}
      </div>
    );
  }
});
