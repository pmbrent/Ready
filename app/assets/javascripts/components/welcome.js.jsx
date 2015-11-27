window.Welcome = React.createClass({
  mixins: [ReactRouter.History],

  signUp: function(e) {
    e.preventDefault();
    var credentials = {
      user: {
        name: $('#name').val(),
        email: $('#email').val(),
        password: $('#password').val()
      }
    };
    SessionsUtil.createUser(credentials, function () {
      this.history.pushState(null, "home/updates");
    }.bind(this));
  },

  render: function() {
    return (
      <div className="heightFix">
        <div className="welcomeBack">
          <div className="welcome">
            <strong>Welcome to Ready!</strong>
            <p>Get ready to find your new favorite book!</p>
          </div>
          <div className="new_user">
            <p>New user signup:</p>
            <form className="new_user_form" onSubmit={this.signUp}>
              <label htmlFor="name">Name:
                <input type="text"
                       id="name">
                </input>
              </label>
              <label htmlFor="email">Email:
                <input type="text"
                       id="email">
                </input>
              </label>
              <label htmlFor="password">Password:
                <input type="password" id="password"></input>
              </label>
              <input type="submit" className="button" value="Sign up!"></input>
            </form>
          </div>
        </div>
      </div>
    );
  }

});
