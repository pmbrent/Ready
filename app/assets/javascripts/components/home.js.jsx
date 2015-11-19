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
      return (
        <div>
          <UserTabs/>
        </div>);
    }
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this.updateUser);
  },

  render: function() {
    return (
      <div className="home">
        {this.userPage()}
        {this.props.children}
      </div>
    );
  }
});

// <ShelfIndex user={this.state.user}/>
