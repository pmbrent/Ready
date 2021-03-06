window.User = React.createClass({

  removeFriend: function() {
    FriendUtil.destroyFriendship(this.props.user.id);
  },

  addFriend: function() {
    FriendUtil.createFriendship(this.props.user.id);
  },

  friendButton: function() {
    if (this.props.isFriend) {
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
