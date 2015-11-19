window.User = React.createClass({

  render: function() {
    return (
      <div className="user">
        <img className="userpic"/>
        <p>{this.props.user.name}</p>
        <div className="userProfile">
          User Profile Placeholder
        </div>
      </div>);
  }

});
