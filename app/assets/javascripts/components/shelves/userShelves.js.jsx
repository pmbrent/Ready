window.UserShelves = React.createClass({

  getInitialState: function() {
    return ({ user: CurrentUserStore.currentUser() });
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this.updateUser);
    ApiUtil.fetchUsers();
  },

  updateUser: function() {
    this.setState({ user: CurrentUserStore.currentUser() });
  },

  shelfPage: function() {
    if (!CurrentUserStore.isLoggedIn()) {
      return <div>
        </div>;
    } else {
      return (
        <div>
          <ShelfIndex user={this.state.user}/>
        </div>);
    }
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this.updateUser);
  },

  render: function() {
    return (
      <div className="userShelf">
        {this.shelfPage()}
      </div>
    );
  }

});
