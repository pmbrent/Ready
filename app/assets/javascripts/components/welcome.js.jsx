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
      <div>
        <section className="welcome">
          <strong>Welcome to Ready!</strong>
          <p>Get ready to find your next favorite book!</p>
        </section>

        <div className="new_user">
          <p>New user signup:</p>
          <form onSubmit={this.signUp}>
            <label htmlFor="name">Name:
              <input type="text"
                     id="name">
              </input>
            </label>
            <br/>
            <label htmlFor="email">Email:
              <input type="text"
                     id="email">
              </input>
            </label>
            <br/>
            <label htmlFor="password">Password:
              <input type="password" id="password"></input>
            </label>
            <br/>
            <input type="submit" value="Sign up!"></input>
          </form>
        </div>
      </div>
    );
  }

});
