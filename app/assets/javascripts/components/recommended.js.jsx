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
      var recs = {
        title: "Recommended for you",
        books: this.state.recommended
      };
      return <RecBox recs={recs}/>;
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
              <p>Q: How are my personal recommendations calculated?</p>
              <p>A: The answer is SQL!</p>
            </div>
          </div>
          <div className="shelves">
              {this.showRecommendations()}
              {this.showPopular()}
          </div>
        </div>
      </div>
    );

  }

});
