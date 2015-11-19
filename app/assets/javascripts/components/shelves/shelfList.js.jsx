window.ShelfList = React.createClass({

  render: function() {
    return (
      <div className="shelfList sideBox">
        <p>All Bookshelves:</p>
        {this.props.shelves.map(function(shelf) {
          return <p id={shelf.id}>{shelf.title} ({shelf.books.length})</p>;
        })}
      </div>
    );
  }

});
