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

  componentWillUnmount: function() {
    CurrentUserStore.removeFeedListener(this.updateFeed);
  },

  render: function() {
    return (
      <div className="userFeed">
        {this.state.feed.map(function(feedItem) {
          return <FeedItem key={feedItem.id} feedItem={feedItem}/>;
        })}
      </div>
    );

  }

});
