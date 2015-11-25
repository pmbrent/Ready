window.Recommended = React.createClass({

  getInitialState: function() {
    return ({
      popular: BookStore.popular(),
      recommended: RecommendationStore.fetchRecs(10)
    });
  },

  componentDidMount: function() {
    BookStore.addChangeListener(this.updatePopular);
    ApiUtil.fetchBooks();

    RecommendationStore.addChangeListener(this.updateRecs);
    if (!CurrentUserStore.currentUserId()) {
      CurrentUserStore.addChangeListener(this.tempFunction);
    }
    ApiUtil.fetchUserRecommendations(CurrentUserStore.currentUserId());
  },

  tempFunction: function() {
    ApiUtil.fetchUserRecommendations(CurrentUserStore.currentUserId());
    CurrentUserStore.removeChangeListener(this.tempFunction);
  },

  updatePopular: function() {
    this.setState({
      popular: BookStore.popular()
    });
  },

  updateRecs: function() {
    this.setState({
      recommended: RecommendationStore.fetchRecs(10)
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

  showRecommendations: function() {
    if (!this.state.recommended.length) {
      return <div/>;
    } else {
      var recShelf = {
        title: "Recommended for you",
        books: this.state.recommended
      };
      return <Shelf shelf={recShelf}/>;
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
              How are my personal recommendations calculated?
            </div>
          </div>
          <div className="bodyContainer">
              {this.showRecommendations()}
              {this.showPopular()}
            </div>
        </div>
      </div>
    );

  }

});
