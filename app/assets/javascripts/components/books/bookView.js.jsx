window.BookView = React.createClass ({

  getInitialState: function() {

    return {
      book: BookStore.find(parseInt(this.props.params.bookId)),
      shelves: [] };
    },

  componentDidMount: function() {
    BookStore.addChangeListener(this.updateBook);
    ApiUtil.fetchBooks();

    UserStore.addChangeListener(this.updateShelves);
    ApiUtil.fetchUserShelves(window.currentUserId);
  },

  updateShelves: function() {
    this.setState({ shelves: UserStore.find(window.currentUserId).shelves });
  },

  updateBook: function() {
    this.setState({ book: BookStore.find(parseInt(this.props.params.bookId)) });
  },

  showBook: function() {
    if (typeof this.state.book === "undefined" ||
        typeof this.state.shelves === "undefined" ) {
      return <div/>;
    } else {
      return (
        <div>
          <div className="sideColumn">
            <BookShelver
              book={this.state.book}
              shelves={this.state.shelves}
            />
          </div>
            <div className="bodyContainer">
              <Book book={this.state.book}/>
            </div>
        </div>
      );
    }
  },

  componentWillUnmount: function() {
    BookStore.removeChangeListener(this.updateBook);
  },

  render: function() {
    return (<div className="bookView view group">
              {this.showBook()}
            </div>);
  }

});
