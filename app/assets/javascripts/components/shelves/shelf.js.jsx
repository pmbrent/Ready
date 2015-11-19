window.Shelf = React.createClass({

  componentDidMount: function() {
    $('.carousel').carousel();
  },

  render: function() {
    //REFACTOR to display hovered book in a bubble window
    return (<div className="shelf">
      <strong>{this.props.shelf.title}</strong>

      <div className="books carousel">
        <div className="active"></div>
        <ul className="book-items group">
          {this.props.shelf.books.map(function(book) {
            var bookurl = "/#/books/" + book.id;
            return <li><a href={bookurl} id={book.id}>{book.title}</a></li>;
          })}
        </ul>
        <a href="#" className="slide">◀</a>
        <a href="#" className="slide">▶</a>
      </div>

    </div>);
  }

});
