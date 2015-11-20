window.BookShelver = React.createClass({

  selectShelf: function(e) {
    this.setState({selectedShelf: e.currentTarget.selectedOptions[0].id});
  },

  shelveBook: function() {
    if (this.state === "null") {
      this.setState({selectedShelf: this.props.shelves[0].id});
    }
    ApiUtil.shelveBook(this.props.book.id, this.state.selectedShelf);
  },

  render: function() {
    // Current User's shelves here REFACTOR
    return (
      <div className="bookShelver sideBox">
        <p>Add {this.props.book.title} to Shelf:</p>
        <form>
          <select
            onChange={this.selectShelf}
            className="select">
            {this.props.shelves.map(function(shelf) {
              return <option key={shelf.id}>{shelf.title}</option>;
            })}
          </select>
          <button className="button" onClick={this.shelveBook}>Add</button>
        </form>

      </div>);
  }

});
