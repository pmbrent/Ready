window.ShelfList = React.createClass({

  render: function() {
    return (
      <div className="shelfList">
        All Bookshelves:
        {this.props.shelves.map(function(shelf) {
          return <p id={shelf.id}>{shelf.title} ({shelf.books.length})</p>;
        })}
      </div>
    );
  }

});
