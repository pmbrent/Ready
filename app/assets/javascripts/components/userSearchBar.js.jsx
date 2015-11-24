window.UserSearchBar = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function() {
    return {query: ""};
  },

  updateQuery: function() {
    this.setState({
      query: $('input#userquery').val()
    });
  },

  trySearch: function() {
    var context = this;
    if (UserStore.all().length === 0) {
      ApiUtil.fetchUsers(function() {
        context.search(context.state.query);
      });
    } else {
      this.search(this.state.query);
    }
  },

  search: function(query) {
    UserStore.search(query);
    this.history.pushState(null, "/directory");
  },

  render: function() {
    return (
      <form id="userSearch" className="searchBar forUsers" onSubmit={this.trySearch}>
        <input id="userquery"
          type="text"
          value={this.state.query}
          onChange={this.updateQuery}
          placeholder="Name or Email"/>
        <input id="submit" type="submit" value="🔍"/>
      </form>
    );
  }

});
