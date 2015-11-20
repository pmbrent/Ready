window.Welcome = React.createClass({
  signUp: function() {
    e.preventDefault();
    var credentials = {
      user: {
        name: $('input:name').val(),
        email: $('input:email').val(),
        password: $('input:password').val()
      }
    };
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
