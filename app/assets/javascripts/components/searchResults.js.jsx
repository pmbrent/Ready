window.SearchResults = React.createClass({

  results: function() {
    if (BookStore.results().length === 0) {
      return (<p>No results found.</p>);
    }

    return (
      <ul className="results group">
        {BookStore.results().map(function(book) {
          var bookUrl = "/#/books/" + book.id;
          var coverUrl = "http://covers.openlibrary.org/b/isbn/" + book.isbn + "-S.jpg";
          return (
            <li key={book.id}>
              <a href={bookUrl}>{book.title}
                <img src={coverUrl} alt={book.title}/>
              </a>
            </li>);
        })}
      </ul>
    );
  },

  render: function() {
    return (
      <div className="resultPage group">
        <section className="sideColumn" id="bookAdder">
          <section className="sideBox">
            (Refactor Link/Form to add a book)
          </section>
        </section>
        {this.results()}
      </div>
    );
  }
});
