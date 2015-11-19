window.BookShelver = React.createClass({

  render: function() {
    // Current User's shelves here REFACTOR
    return (
      <div className="bookShelver">
        <p>Add {this.props.book.title} to Shelf:</p>
        <form>
          <select className="select">
            <option>Shelf 1</option>
            <option>Shelf 2</option>
          </select>
        </form>

      </div>);
  }

});
