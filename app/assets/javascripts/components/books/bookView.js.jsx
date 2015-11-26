window.BookView = React.createClass ({

  getInitialState: function() {
    return {
      book: BookStore.find(parseInt(this.props.params.bookId)),
      shelves: CurrentUserStore.currentUser().shelves,
      inShelves: [],
      listening: true };
    },

  componentDidMount: function() {
    BookStore.addChangeListener(this.updateBook);
    ApiUtil.fetchBooks();

    CurrentUserStore.addChangeListener(this.updateShelves);
    SessionsUtil.fetchCurrentUser();
  },

  inShelves: function() {
    return this.state.shelves.filter((function (shelf) {
      return shelf.books.some((function (book) {
        return book.id === parseInt(this.props.params.bookId);
      }).bind(this));
    }).bind(this));
  },

  updateShelves: function() {
    if (typeof CurrentUserStore.currentUserId() !== "undefined") {

      this.setState({
        shelves: CurrentUserStore.currentUser().shelves
      });

      this.setState({
        inShelves: this.inShelves()
      });

      if (typeof this.state.shelves === "undefined" ||
          this.state.shelves.length === 0) {
        ApiUtil.fetchUserInfo(CurrentUserStore.currentUserId());
      }
    }
  },

  updateBook: function() {
    this.setState({ book: BookStore.find(parseInt(this.props.params.bookId)) });
  },

  showBook: function() {
    if (typeof this.state.book === "undefined") {
      return <div/>;
    } else if (typeof this.state.shelves === "undefined" ) {
      return (<div className="bodyContainer">
        <Book book={this.state.book}/>
      </div>);
    } else {
      return (
        <div>
          <div className="sideColumn">
            <BookShelver
              book={this.state.book}
              shelves={this.state.shelves}
              inShelves={this.state.inShelves}
              updateShelves={this.updateShelves}/>
            <div className="sideBox">
              <p>Find a physical copy of this book at a library near you!</p>
              <a href={"http://www.worldcat.org/isbn/" + this.state.book.isbn}>
                <WorldCat title={this.state.book.title}/>
              </a>
            </div>
          </div>
            <div className="bodyContainer">
              <Book book={this.state.book}/>
              <div className="largeBar">
                <RatingBar
                  rating={this.state.book.rating}
                  bookId={this.state.book.id}/>
              </div>
            </div>
        </div>
      );
    }
  },

  componentWillUnmount: function() {
    BookStore.removeChangeListener(this.updateBook);
    CurrentUserStore.removeChangeListener(this.updateShelves);
  },

  render: function() {
    return (<div className="bookView view group">
              {this.showBook()}
            </div>);
  }

});
