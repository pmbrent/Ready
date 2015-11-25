window.Recommended = React.createClass({

  getInitialState: function() {
    return ({
      popular: BookStore.popular()
    });
  },

  componentDidMount: function() {
    BookStore.addChangeListener(this.updatePopular);
    ApiUtil.fetchBooks();
  },

  updatePopular: function() {
    this.setState({
      popular: BookStore.popular()
    });
  },

  showPopular: function() {
    if (!this.state.popular.length) {
      return <div/>;
    } else {
      var popShelf = {
        title: "Popular on Ready",
        books: this.state.popular
      };
      return <Shelf shelf={popShelf}/>;
    }
  },

  componentWillUnmount: function() {
    BookStore.removeChangeListener(this.updatePopular);
  },

  render: function() {
    return (
      <div>
        <UserTabs active="recommended"/>
        <div className="recommendedPage group">
          <div className="sideColumn">
            <div className="sideBox">
              Placeholder text~~~
            </div>
          </div>
          <div className="bodyContainer">
            <strong className="strongBar">Personalized Reviews</strong>
            <div>Coming soon!</div>
              {this.showPopular()}
            </div>
        </div>
      </div>
    );

  }

});
