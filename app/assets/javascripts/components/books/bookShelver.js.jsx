window.BookShelver = React.createClass({

  getInitialState: function() {
    return {selectedShelf: this.props.shelves[0].id};
  },

  selectShelf: function(e) {
    this.setState({selectedShelf: e.currentTarget.selectedOptions[0].id});
  },

  shelveBook: function() {
    ApiUtil.shelveBook(this.props.book.id, this.state.selectedShelf);
  },

  unshelveBook: function(shelf_id) {
    ApiUtil.unshelveBook(this.props.book.id, shelf_id, CurrentUserStore.currentUser().id);
  },

  curShelves: function() {
    if (this.props.inShelves.length < 1) {
      return <div className="currentShelvesempty"/>;
    } else {
      return (
        <div className="currentShelves">
          Currently on your shelves:
          <ul>
            {this.props.inShelves.map(function(shelf) {
              return (
                <li key={shelf.id}>{shelf.title}
                  <a href="#"
                    onClick={function() {
                      this.unshelveBook(shelf.id);
                    }.bind(this)}>
                    Unshelve
                  </a>
                </li>
              );
            }.bind(this))}
          </ul>
        </div>
      );
    }
  },

  render: function() {
    // Current User's shelves here REFACTOR
    return (
      <div className="bookShelver sideBox group">
        <p>Add {this.props.book.title} to Shelf:</p>
        <form>
          <select
            onChange={this.selectShelf}
            className="select">
            {this.props.shelves.map(function(shelf) {
              return <option id={shelf.id} key={shelf.id}>{shelf.title}</option>;
            })}
          </select>
          <button className="button" onClick={this.shelveBook}>Add</button>
        </form>
        {this.curShelves()}
      </div>);
  }

});
