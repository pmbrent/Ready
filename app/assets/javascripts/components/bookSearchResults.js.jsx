window.BookSearchResults = React.createClass({

  results: function() {
    if (BookStore.results().length === 0) {
      return (
        <div className="bodyContainer">
          <p className="noResults">No results found.</p>
        </div>
      );
    }

    return (
      <ul className="results group">
        <li key="key" className="bookResult key group">
          <p>Cover</p>
          <p>Title</p>
          <p>Author</p>
          <p>Description</p>
          <p>Add to Shelf</p>
        </li>
        {BookStore.results().map(function(book) {
          var bookUrl = "/#/books/" + book.id;
          var coverUrl = "http://covers.openlibrary.org/b/isbn/" + book.isbn + "-S.jpg";
          return (
            <li key={book.id} className="bookResult group">
              <a href={bookUrl}>
                <img src={coverUrl} alt={book.title}/>
                <p>{book.title}</p>
              </a>
              <p>{book.author}</p>
              <p>{book.description.slice(0,200) + "..."}</p>
              <MiniShelver book={book} shelves={CurrentUserStore.currentUser().shelves}/>
            </li>);
        })}
      </ul>
    );
  },

  render: function() {
    return (
      <div className="resultsPage group">
        <section className="sideColumn" id="bookAdder">
          <section className="sideBox">
            <strong>Popular Searches:</strong>
            <ul>
              <li>The cat who</li>
              <li>Nora</li>
              <li>John</li>
            </ul>
          </section>
        </section>
        {this.results()}
      </div>
    );
  }
});
