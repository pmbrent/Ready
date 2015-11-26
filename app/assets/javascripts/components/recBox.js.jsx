window.RecBox = React.createClass({

  // RatedBooks have a book_id; regular books, just use id
  makeShelves: function() {
    return this.props.recs.books.map(function(book) {
      var bookUrl = "/#/books/" + book.book_id;
      var coverUrl = "http://covers.openlibrary.org/b/isbn/" +
                      book.isbn + "-M.jpg";
      return (
        <div key={book.id} className="recItem">
          <li>
            <a href={bookUrl}>{book.title}
              <img src={coverUrl} alt={book.title}/>
            </a>
            <div className="smallBar">
              <RatingBar bookId={book.book_id || book.id} rating={book.rating}/>
            </div>
            <button className="button">Dismiss</button>
          </li>
        </div>
      );
    });
  },

  render: function() {
    books = this.makeShelves();
    row1 = books.slice(0,5);
    row2 = books.slice(5,10);

    return (<div className="recBox">
      <strong className="strongBar">{this.props.recs.title}</strong>

        <ul className="book-items shelf recs group">
            {row1}
            {row2}
        </ul>
      </div>);
  }

});
