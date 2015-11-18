window.UserShelves = React.createClass({

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

  shelfPage: function() {
    if (typeof this.state.user === "undefined") {
      return <div/>;
    } else {
      return (
        <div>
          <ShelfIndex user={this.state.user}/>
        </div>);
    }
  },

  render: function() {
    return (
      <div className="userShelf">
        {this.shelfPage()}
      </div>
    );
  }

});
