window.SearchResults = React.createClass({

  render: function() {
    return (
      <div>
        <section className="sideColumn">
          SideColumn Placeholder! What should go here?
        </section>
        <ul className="results group">
          {BookStore.results().map(function(book) {
            var bookUrl = "/#/books/" + book.id;
            var coverUrl = "http://covers.openlibrary.org/b/isbn/" +
                            book.isbn + "-S.jpg";
            return (
              <li key={book.id}>
                <a href={bookUrl}>{book.title}
                  <img src={coverUrl} alt={book.title}/>
                </a>
              </li>);
          })}
        </ul>
      </div>
    );
  }


});
