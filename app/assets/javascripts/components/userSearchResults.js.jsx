window.UserSearchResults = React.createClass({

  results: function() {
    if (UserStore.results().length === 0) {
      return (<p className="noResults">No users found.</p>);
    }

    return (
      <ul className="results group">
        <li key="key" className="userResult key group">
          <p>Username</p>
          <p>Email</p>
        </li>
        {UserStore.results().map(function(user) {
          var userUrl = "/#/users/" + user.id;
          return (
            <li key={user.id} className="userResult group">
              <a href={userUrl}>
                <p>{user.name}</p>
              </a>
              <p>{user.email}</p>
            </li>);
        })}
      </ul>
    );
  },

  render: function() {
    return (
      <div className="resultPage group">
        <section className="sideColumn" id="userSidebar">
          <section className="sideBox">
            <p>Is someone missing out? We grow best by referrals. Invite them to join us!</p>
          </section>
        </section>
        {this.results()}
      </div>
    );
  }
});
