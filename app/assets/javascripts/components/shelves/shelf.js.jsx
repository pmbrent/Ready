window.Shelf = React.createClass({

  componentDidMount: function() {
    $('.carousel').carousel();
  },

  render: function() {
    //REFACTOR to display hovered book in a bubble window
    return (<div className="shelf">
      <strong>{this.props.shelf.title}</strong>

      <div className="books carousel">
        <div className="active"></div>
        <ul className="book-items group">
          {this.props.shelf.books.map(function(book) {
            var bookUrl = "/#/books/" + book.id;
            var coverUrl = "http://covers.openlibrary.org/b/isbn/" +
                            book.isbn + "-M.jpg";
            return (
              <li key={book.id}>
                <a href={bookUrl}>{book.title}
                  <img src={coverUrl} alt={book.title}/>
                </a>
              </li>);
          })}
        </ul>
        <a href="#" className="slide">◀</a>
        <a href="#" className="slide">▶</a>
      </div>

    </div>);
  }

});
