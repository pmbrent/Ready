window.SearchBar = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function() {
    return {query: ""};
  },

  updateQuery: function(e) {
    debugger
    this.setState({
      query: $(e.currentTarget).value
    });
  },

  search: function() {
    BookStore.search(this.state.query);
    this.history.pushState(null, "/search");
  },

  render: function() {
    return (
      <form id="search" className="searchBar"
          onChange={this.updateQuery}
          onSubmit={this.search}>
        <input id="query" type="text" value={this.state.query}
          placeholder="Author/Title/ISBN"/>
        <input id="submit" type="submit" value="Search"/>
      </form>
    );
  }

});
