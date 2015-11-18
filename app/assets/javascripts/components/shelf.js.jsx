window.Shelf = React.createClass({

  render: function() {
    return (<div className="shelf">
      {this.props.shelf.title}
      {this.props.shelf.books.map(function(book) {
        return <Book id={book.id} book={book}/>;
      })}
    </div>);
  }

});
