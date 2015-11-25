window.ReviewItem = React.createClass({

  render: function() {
    var coverUrl = "http://covers.openlibrary.org/b/isbn/" +
                    this.props.book.isbn + "-S.jpg";
    var bookUrl = "#/books/" + this.props.book.id;

    return (
      <div className="reviewItem group">
        <div className="imgBox">
          <a href={bookUrl}>
            <img src={coverUrl}/>
          </a>
        </div>
        <p>
          {this.props.book.title} by {this.props.book.author}
        </p>
        <div className="smallBar">
          <RatingBar
            rating={this.props.book.rating}
            bookId={this.props.book.id}/>
        </div>
      </div>
    );
  }

});
