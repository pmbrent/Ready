window.ShelfIndex = React.createClass({

  componentDidMount: function() {
    UserStore.addChangeListener(this.updateUser);
    ApiUtil.fetchUserShelves(this.props.user.id);
  },

  updateUser: function() {
    this.setState({ user: UserStore.find(this.props.user.id) });
  },

  getUserShelves: function() {
    if (typeof this.props.user === "undefined" ||
        typeof this.props.user.shelves === "undefined") {
      return <div/>;
    } else {
      return (
        <div>
          <section className="sideColumn">
            <ShelfList shelves={this.props.user.shelves}/>
          </section>
          <section className="shelves">
          {this.props.user.shelves.map(function(shelf) {
            return <Shelf key={shelf.id} shelf={shelf}/>;
          })}
          </section>
        </div>
      );
    }
  },

  render: function() {
    return (<div className="shelfIndex group">
      {this.getUserShelves()}
    </div>);
  }

});
