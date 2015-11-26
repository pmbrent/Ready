window.Updates = React.createClass({
  getInitialState: function() {
    return { feed: CurrentUserStore.userFeed() };
  },

  componentDidMount: function() {
    CurrentUserStore.addFeedListener(this.updateFeed);
    BookStore.addChangeListener(this.reloadFeed);
    SessionsUtil.fetchCurrentUserFeed();
  },

  reloadFeed: function() {
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
    BookStore.removeChangeListener(this.reloadFeed);
  },

  render: function() {
            // <div className="sideBox">
            //   <UserSearchBar/>
            // </div>
    return (
      <div>
        <UserTabs active="updates"/>
        <div className="updatesPage group">
          {this.showFeed()}
          <div className="sideColumn updates group">
            <div className="sideBox">
              Tip: You can hover over a book to view more detailed information or rate it!
            </div>
            <div className="sideBox">
              Know someone who would enjoy the site? Our recommendations depend on our users. Invite them to join!
            </div>
          </div>
        </div>
      </div>
    );

  }

});
