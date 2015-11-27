window.HoverableBook = React.createClass({

  getInitialState: function() {
    return {
      hovering: false
    };
  },

  showDescription: function() {
    if (this.props.book.title.length > 23) {
      return this.props.book.description.slice(0,165) + "...";
    } else {
      return this.props.book.description.slice(0,220) + "...";
    }
  },

  hoverName: function() {
    if (this.state.hovering) {
      return " active";
    } else {
      return "";
    }
  },

  toggleState: function() {
    this.setState({hovering: !this.state.hovering});
  },

  render: function() {
    var coverUrl = "http://covers.openlibrary.org/b/isbn/" +
                    this.props.book.isbn + "-M.jpg";
    var bookUrl = "#/books/" + this.props.book.book_id;
              //Remember, this "book" is really a recommendation, has a book_id

    return (
      <div className="hoverableBook" onMouseEnter={this.toggleState}
                        onMouseLeave={this.toggleState}>
        <div className={"bookImgBefore" + this.hoverName()}>
          <p>{this.props.book.title}</p>
          <p>by {this.props.book.author}</p>
          <p>{this.showDescription()}</p>
          <div className="ratingInfo group">
            <div className="smallBar">
              <RatingBar
                bookId={this.props.book.book_id}/>
            </div>
            <p>Average rating: {parseFloat(this.props.book.avg_rating).toPrecision(3)}</p>
          </div>
        </div>
        <a href={bookUrl}>
          {this.props.book.title}
          <img src={coverUrl}/>
        </a>
        <div className={"bookImgAfter" + this.hoverName()}/>
    </div>
    );
  }

});
