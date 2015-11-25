window.Book = React.createClass({

  ratingBox: function() {
    if (this.props.book.rating) {
      return (
        <div className="ratingBox">
          Your rating: {parseInt(this.props.book.rating)}
        </div>
      );
    } else {
      return (
        <div className="ratingBox">
          Rate this book: 1 2 3 4 5
        </div>
      );
    }
  },


  render: function() {
    var coverUrl = "http://covers.openlibrary.org/b/isbn/" +
                    this.props.book.isbn + "-M.jpg";

    return (
      <div className="book group">
        <img className="cover" src={coverUrl} />
        <h2>{this.props.book.title}</h2>
        <p>{this.props.book.author}</p>
        <p>{this.props.book.description}</p>
        {this.ratingBox()}
      </div>);
  }

});
