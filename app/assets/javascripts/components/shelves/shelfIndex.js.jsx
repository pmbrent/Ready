window.ShelfIndex = React.createClass({

  getInitialState: function() {
    return ({user: {}});
  },

  componentDidMount: function() {
    var userId = this.props.userId ||
      parseInt(this.props.location.pathname.split("/")[2]);
    UserStore.addChangeListener(this.updateUser);
    ApiUtil.fetchUserInfo(userId);
  },

  updateUser: function() {
    var userId = this.props.userId ||
      parseInt(this.props.location.pathname.split("/")[2]);
    this.setState({ user: UserStore.find(userId) });
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
            <strong className="strongTitle">{this.state.user.name + "'s shelves"}</strong>
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
