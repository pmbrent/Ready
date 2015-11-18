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
        this.props.user.shelves.map(function(shelf) {
          return <Shelf id={shelf.id} shelf={shelf}/>;
        })
      );
    }
  },

  render: function() {
    return (<div className="shelfIndex">
      {this.getUserShelves()}
    </div>);
  }

});
