window.RecBox = React.createClass({

  dismissBook: function(bookId) {
    return function() {
      ApiUtil.rejectBook(bookId, CurrentUserStore.currentUserId());
    };
  },

  // RatedBooks have a book_id; regular books, just use id
  makeShelves: function() {
    context = this;

    return this.props.recs.books.map(function(book) {
      var bookId = book.book_id || book.id;

      return (
        <div key={bookId} className="recItem">
          <li>
            <HoverableBook book={book}/>
            <div className="smallBar hideText">
              <RatingBar bookId={bookId} rating={book.rating}/>
            </div>
            <button onClick={context.dismissBook(bookId)} className="button">
              Dismiss
            </button>
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
