window.Shelf = React.createClass({

  render: function() {
    return (<div className="shelf">
      <strong>{this.props.shelf.title}</strong>
      <div className="books group">
        {this.props.shelf.books.map(function(book) {
          var bookurl = "/#/books/" + book.id;
          return <a href={bookurl} id={book.id}>{book.title}</a>;
        })}
      </div>
    </div>);
  }

});
