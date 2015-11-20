window.SearchBar = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function() {
    return {query: ""};
  },

  updateQuery: function() {
    this.setState({
      query: $('input#query').val()
    });
  },

  trySearch: function() {
    var context = this;
    if (BookStore.all().length === 0) {
      ApiUtil.fetchBooks(function() {
        context.search(context.state.query);
      });
    } else {
      this.search(this.state.query);
    }
  },

  search: function(query) {
    BookStore.search(query);
    this.history.pushState(null, "/search");
  },

  render: function() {
    return (
      <form id="search" className="searchBar" onSubmit={this.trySearch}>
        <input id="query"
          type="text"
          value={this.state.query}
          onChange={this.updateQuery}
          placeholder="Title / Author / ISBN"/>
        <input id="submit" type="submit" value="🔍"/>
      </form>
    );
  }

});
