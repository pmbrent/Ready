window.BookView = React.createClass ({

  getInitialState: function() {
    return { book: BookStore.find(parseInt(this.props.params.bookId)) };
  },

  componentDidMount: function() {
    BookStore.addChangeListener(this.updateBook);
    if (typeof this.state.book === "undefined") {
      ApiUtil.fetchBooks();
    }
  },

  updateBook: function() {
    this.setState({ book: BookStore.find(parseInt(this.props.params.bookId)) });
  },

  showBook: function() {
    if (typeof this.state.book === "undefined") {
      return <div/>;
    } else {
      return (
        <div>
          <Book book={this.state.book}/>
          <BookShelver book={this.state.book}/>
        </div>
      );
    }
  },

  componentWillUnmount: function() {
    BookStore.removeChangeListener(this.updateBook);
  },

  render: function() {
    return (<div className="bookView">
              {this.showBook()}
            </div>);
  }

});
