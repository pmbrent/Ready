window.Recommended = React.createClass({

  getInitialState: function() {
    return ({
      popular: BookStore.popular(10),
      recommended: []
    });
  },

  componentDidMount: function() {
    BookStore.addChangeListener(this.updatePopular);
    ApiUtil.fetchBooks();

    RecommendationStore.addChangeListener(this.updateRecs);
    RecommendationStore.addResetListener(this.requestRecs);
    this.requestRecs();
  },

  tempFunction: function() {
    ApiUtil.fetchUserRecommendations(CurrentUserStore.currentUserId());
    CurrentUserStore.removeChangeListener(this.tempFunction);
  },

  updatePopular: function() {
    this.setState({
      popular: BookStore.popular(10)
    });
  },

  updateRecs: function() {
    this.setState({
      recommended: RecommendationStore.fetchRecs(10)
    });
  },

  requestRecs: function() {
    if (!CurrentUserStore.currentUserId()) {
      CurrentUserStore.addChangeListener(this.tempFunction);
    } else {
      ApiUtil.fetchUserRecommendations(CurrentUserStore.currentUserId());
    }
  },

  showPopular: function() {
    if (!this.state.popular.length) {
      return <div/>;
    } else {
      var popRecs = {
        title: "Popular on Ready",
        books: this.state.popular
      };
      return <RecBox recs={popRecs}/>;
    }
  },

  showRecommendations: function() {
    if (!this.state.recommended.length) {
      return (<div>
        <p>Loading personalized recommendations...</p>
      </div>);
    } else {
      var userRecs = {
        title: "Recommended for you",
        books: this.state.recommended
      };
      return <RecBox recs={userRecs}/>;
    }
  },

  componentWillUnmount: function() {
    BookStore.removeChangeListener(this.updatePopular);
    RecommendationStore.removeResetListener(this.requestRecs);
  },

  render: function() {
    return (
      <div>
        <UserTabs active="recommended"/>
        <div className="recommendedPage group">
          <div className="sideColumn">
            <div className="sideBox">
              <p>Q: Why don't I see any personalized recommendations?</p>
              <p>A: We probably don't have enough data on your preferences. Try rating more books!</p>
            </div>
            <div className="sideBox">
              <p>Q: How are my personal recommendations calculated?</p>
              <p>A: Users who tend to rate similarly to you are selected using SQL; you are then presented with some of their most favorite books.</p>
            </div>
            <div className="sideBox">
              <p>Q: Why can't I dismiss popular books?</p>
              <p>A: Dismissing them will reject them from your personal recommendations but does not affect their popularity. However, if you haven't, try rating them and see what happens!</p>
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
