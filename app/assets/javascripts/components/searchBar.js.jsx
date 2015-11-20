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

  search: function() {
    BookStore.search(this.state.query);
    this.history.pushState(null, "/search");
    this.forceUpdate();
  },

  render: function() {
    return (
      <form id="search" className="searchBar" onSubmit={this.search}>
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
