window.UserSearchBar = React.createClass({
  mixins: [ReactRouter.History],

  updateQuery: function(e) {
    e.preventDefault();
    var query = $('input#userquery').val();
    this.history.pushState(null, "/users/search", {
      query: query,
      page: 1
    });
  },

  // search: function() {
  //   ApiUtil.searchUsers(this.state.query, 1);
  // },

  render: function() {
    return (
      <form id="userSearch" className="searchBar forUsers">
        <input id="userquery"
          type="text"
          onChange={this.updateQuery}
          placeholder="Name or Email"/>
        <input id="submit" type="submit" value="🔍"/>
      </form>
    );
  }

});
