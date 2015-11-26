window.UserSearchResults = React.createClass({

  mixins: [ReactRouter.History],

  componentDidMount: function () {
    SearchStore.addChangeListener(this.updateResults);

    var queryParams = this.props.location.query;
    ApiUtil.searchUsers(queryParams.query || "", queryParams.page || 1);
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.searchUsers(
      newProps.location.query.query,
      newProps.location.query.page
    );
  },

  updateResults: function () {
    this.setState({results: SearchStore.results()});
  },

  pageLinks: function() {
// REFACTOR to link prev page, restrict to existing pages
    var nextPage = (parseInt(this.props.location.query.page) || 1) + 1;

    return (
      <div className="pageLinks">
        <p>
          Displaying { SearchStore.results().length }
          of { SearchStore.total() }
        </p>

        <a href={ "#/search?query=" + query + "&page=" + nextPage }>
          Next
        </a>
      </div>
    );
  },

  results: function() {
    if (SearchStore.results().length === 0) {
      return (<p className="noResults">No users found.</p>);
    }

    return (
      <div>
        <ul className="results group">
          <li key="key" className="userResult key group">
            <p>Username</p>
            <p>Email</p>
          </li>
          {SearchStore.results().map(function(user) {
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
        {this.pageLinks()}
      </div>
    );
  },

  componentWillUnmount: function () {
    SearchStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="resultsPage bodyContainer group">
        <section className="sideColumn userSidebar group">
          <section className="sideBox">
            <p>Is someone missing? We grow best by referrals. Invite them to join us!</p>
          </section>
        </section>
        <div className="searchResults">
          <UserSearchBar />
          {this.results()}
        </div>
      </div>
    );
  }
});
