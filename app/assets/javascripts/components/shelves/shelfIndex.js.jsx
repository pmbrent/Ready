window.ShelfIndex = React.createClass({

  getInitialState: function() {
    return ({user: {}});
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this.updateUser);
    ApiUtil.fetchUserInfo(this.props.userId);
  },

  updateUser: function() {
    this.setState({ user: UserStore.find(this.props.userId) });
  },

  getUserShelves: function() {
    if (typeof this.state.user === "undefined" ||
        typeof this.state.user.shelves === "undefined") {
      return <div/>;
    } else {
      return (
        <div>
          <section className="sideColumn">
            <ShelfList shelves={this.state.user.shelves}/>
          </section>
          <section className="shelves">
          {this.state.user.shelves.map(function(shelf) {
            return <Shelf key={shelf.id} shelf={shelf}/>;
          })}
          </section>
        </div>
      );
    }
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this.updateUser);
  },

  render: function() {
    return (<div className="shelfIndex group">
      {this.getUserShelves()}
    </div>);
  }

});
