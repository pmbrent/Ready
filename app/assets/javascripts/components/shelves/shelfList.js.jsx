window.ShelfList = React.createClass({

  render: function() {
    allShelvesUrl = "#/users/" + this.props.shelves[0].user_id + "/shelves";
    return (
      <div className="shelfList sideBox">
        <p><a href={allShelvesUrl}>All Bookshelves:</a></p>
        {this.props.shelves.map(function(shelf) {
          return <p key={shelf.id}>{shelf.title} ({shelf.books.length})</p>;
        })}
      </div>
    );
  }

});
