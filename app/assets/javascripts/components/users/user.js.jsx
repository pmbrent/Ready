window.User = React.createClass({

  removeFriend: function() {
    FriendUtil.destroyFriendship(this.props.user.id);
  },

  addFriend: function() {
    FriendUtil.createFriendship(this.props.user.id);
  },

  friendButton: function() {
    if (typeof CurrentUserStore.currentUser().friends === "undefined") {
      return <div className="buttonpending"/>;
    } else if (CurrentUserStore.isFriend(this.props.user.id)) {
      return <button className="friending button" onClick={this.removeFriend}>Unfriend</button>;
    } else {
      return <button className="friending button" onClick={this.addFriend}>Add Friend</button>;
    }
  },

  render: function() {
    return (
      <div className="user group">
        <div className="userProps">
          <img className="userpic"/>
          <p>{this.props.user.name}</p>
          {this.friendButton()}
        </div>
        <div className="userProfile">
          
        </div>
      </div>);
  }

});
