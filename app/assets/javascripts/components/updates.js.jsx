window.Updates = React.createClass({
  getInitialState: function() {
    return { feed: CurrentUserStore.userFeed() };
  },

  componentDidMount: function() {
    CurrentUserStore.addFeedListener(this.updateFeed);
    SessionsUtil.fetchCurrentUserFeed();
  },

  updateFeed: function() {
    this.setState({ feed: CurrentUserStore.userFeed() });
  },

  showFeed: function() {
    if (this.state.feed.length < 1) {
      return <div className="userFeed bodyContainer">Loading Feed...</div>;
    } else {
      return (<div className="userFeed bodyContainer">
          {this.state.feed.map(function(feedItem) {
            return <FeedItem key={feedItem.id} feedItem={feedItem}/>;
          })}
        </div>
      );
    }
  },

  componentWillUnmount: function() {
    CurrentUserStore.removeFeedListener(this.updateFeed);
  },

  render: function() {
    return (
      <div className="updatesPage group">
        {this.showFeed()}
        <div className="sideColumn updates group">
          <div className="sideBox">
            Placeholder!
          </div>
        </div>
      </div>
    );

  }

});
