window.ReadyBar = React.createClass({

  loggedIn: function() {
    return(
      <div class="logged_in">
        Welcome, {this.props.user.name}!
        <form action="/session" method="POST">
          <input type="hidden" name="_method" value="DELETE"/>
          <input type="submit" value="Log Out"/>
        </form>
      </div>
    );
  },

  render: function() {
        // <a href="#/"><img src='Ready-logo.png'/></a>
    return(
      <div class="nav">
      </div>
    );
  }
});
