window.UserView = React.createClass ({

  getInitialState: function() {
    return {
      user: UserStore.find(parseInt(this.props.params.userId))
    };
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this.updateUser);
    ApiUtil.fetchUserInfo(this.props.params.userId);
  },

  updateUser: function() {
    this.setState({ user: UserStore.find(parseInt(this.props.params.userId)) });
  },

  showUser: function() {
    if (typeof this.state.user === "undefined") {
      return <div/>;
    } else {
      return (
        <div>
          <div className="sideColumn">
            <ShelfList shelves={this.state.user.shelves}/>
          </div>
          <div className="bodyContainer">
            <User user={this.state.user}/>
            <Shelf shelf={this.state.user.shelves[0]}/>
            <div className="userReviews">
              User Reviews Placeholder
            </div>
          </div>
        </div>
      );
    }
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this.updateUser);
  },

  render: function() {
    return (<div className="userView view group">
              {this.showUser()}
            </div>);
  }

});
