window.SearchResults = React.createClass({

  results: function() {
    if (BookStore.results().length === 0) {
      return (<p className="noResults">No results found.</p>);
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
      <div className="resultPage group">
        <section className="sideColumn" id="bookAdder">
          <section className="sideBox">
            <strong>Popular Searches:</strong>
            <ul>
              <li>97</li>
              <li>Neil</li>
              <li>Alan</li>
            </ul>
          </section>
        </section>
        {this.results()}
      </div>
    );
  }
});
