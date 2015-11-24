window.MiniShelver = React.createClass({

  getInitialState: function() {
    return {selectedShelf: this.props.shelves[0].id};
  },

  selectShelf: function(e) {
    this.setState({selectedShelf: e.currentTarget.selectedOptions[0].id});
  },

  shelveBook: function() {
    ApiUtil.shelveBook(this.props.book.id, this.state.selectedShelf);
  },

  render: function () {
    return (
      <form className="miniShelver">
        <select
          onChange={this.selectShelf}
          className="select">
          {this.props.shelves.map(function(shelf) {
            return <option id={shelf.id} key={shelf.id}>{shelf.title}</option>;
          })}
        </select>
        <button className="button" onClick={this.shelveBook}>Add</button>
      </form>
    );
  }

});
