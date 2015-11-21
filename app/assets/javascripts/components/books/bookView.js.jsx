window.BookView = React.createClass ({

  getInitialState: function() {
    return {
      book: BookStore.find(parseInt(this.props.params.bookId)),
      shelves: CurrentUserStore.currentUser().shelves,
      listening: true };
    },

  componentDidMount: function() {
    BookStore.addChangeListener(this.updateBook);
    ApiUtil.fetchBooks();

    CurrentUserStore.addChangeListener(this.updateShelves);
    UserStore.addChangeListener(this.updateShelves);
  },

  updateShelves: function() {
    if (typeof CurrentUserStore.currentUserId() !== "undefined") {
      if (this.state.listening === true) {
        CurrentUserStore.removeChangeListener(this.updateShelves);
        this.setState({listening: false});
      }
      if (typeof this.state.shelves === "undefined" ||
          this.state.shelves.length === 0) {
        ApiUtil.fetchUserShelves(CurrentUserStore.currentUserId());
      }

      this.setState({
        shelves: UserStore.find(CurrentUserStore.currentUserId()).shelves
      });
    }
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
    UserStore.removeChangeListener(this.updateShelves);
  },

  render: function() {
    return (<div className="bookView view group">
              {this.showBook()}
            </div>);
  }

});
