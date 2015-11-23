window.User = React.createClass({

  removeFriend: function() {
    FriendUtil.destroyFriendship(this.props.user.id);
  },

  addFriend: function() {
    FriendUtil.createFriendship(this.props.user.id);
  },

  friendButton: function() {
    if (CurrentUserStore.isFriend(this.props.user.id)) {
      return <button className="button" onClick={this.removeFriend}>Remove Friend</button>;
    } else {
      return <button className="button" onClick={this.addFriend}>Add Friend</button>;
    }
  },

  render: function() {
    return (
      <div className="user">
        <img className="userpic"/>
        <p>{this.props.user.name}</p>
        {this.friendButton()}
        <br/>
        <div className="userProfile">
          User Profile Placeholder
        </div>
      </div>);
  }

});
