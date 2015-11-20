window.Book = React.createClass({

  render: function() {
    var coverUrl = "http://covers.openlibrary.org/b/isbn/" +
                    this.props.book.isbn + "-M.jpg";

    return (
      <div className="book">
        <img className="cover" src={coverUrl} />
        <h2>{this.props.book.title}</h2>
        <p>{this.props.book.author}</p>
        <p>{this.props.book.description}</p>
      </div>);
  }

});
