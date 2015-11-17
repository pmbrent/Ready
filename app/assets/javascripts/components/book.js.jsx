window.Book = React.createClass({

  render: function() {
    return (
    <div className="book">
      <p>{this.props.book.title}</p>
      <p>{this.props.book.author}</p>
      <p>{this.props.book.description}</p>
    </div>);
  }

});
