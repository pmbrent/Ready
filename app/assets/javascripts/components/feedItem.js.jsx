window.FeedItem = React.createClass({

  getInitialState: function() {
    return {
      hovering: false,
      elapsed: Date.now() - Date.parse(this.props.feedItem.created_at)
    };
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      elapsed: Date.now() - Date.parse(props.feedItem.created_at)
    });
  },

  hoverName: function() {
    if (this.state.hovering) {
      return " active";
    } else {
      return "";
    }
  },

  toggleState: function() {
    this.setState({hovering: !this.state.hovering});
  },

  getTime: function() {
    var elapsed = this.state.elapsed;
    if (elapsed < 2000) {
      return "Just now.";
    } else if (elapsed < 60000) {
      return "" + parseInt(elapsed/1000) + " seconds ago.";
    } else if (elapsed < 120000) {
      return "1 minute ago.";
    } else if (elapsed < 3600000) {
      return "" + parseInt(elapsed/60000) + " minutes ago.";
    } else if (elapsed < 7200000) {
      return "1 hour ago.";
    } else if (elapsed < 86400000) {
      return "" + parseInt(elapsed/3600000) + " hours ago.";
    } else if (elapsed < 172800000) {
      return "Yesterday.";
    } else if (elapsed < 2592000000) {
      return "" + parseInt(elapsed/86400000) + " days ago.";
    } else {
      return "Over a month ago.";
    }
  },

  fname: function() {
    var names = this.props.feedItem.friend.split(" ");
    var regex = new RegExp("^Mr|^Ms|^Miss|^Dr.");
    if (regex.test(names[0])) {
      return names[1];
    } else {
      return names[0];
    }
  },

  showDescription: function() {
    if (this.props.feedItem.title.length > 44) {
      return this.props.feedItem.description.slice(0,85) + "...";
    } else if (this.props.feedItem.title.length > 23) {
      return this.props.feedItem.description.slice(0,165) + "...";
    } else {
      return this.props.feedItem.description.slice(0,220) + "...";
    }
  },

  render: function() {
    var coverUrl = "http://covers.openlibrary.org/b/isbn/" +
                    this.props.feedItem.isbn + "-S.jpg";
    var friendUrl = "#/users/" + this.props.feedItem.friend_id;
    var bookUrl = "#/books/" + this.props.feedItem.book_id;

    return (
      <div className="feedItem group">
        <div className="feedBox" onMouseEnter={this.toggleState}
                                onMouseLeave={this.toggleState}>
          <div className={"bookImgBefore" + this.hoverName()}>
            <p>{this.props.feedItem.title}</p>
            <p>by {this.props.feedItem.author}</p>
            <p>{this.showDescription()}</p>
            <div className="ratingInfo group">
              <div className="smallBar">
                <RatingBar
                  rating={this.props.feedItem.user_rating}
                  bookId={this.props.feedItem.book_id}/>
              </div>
              <p>Average rating: {parseFloat(this.props.feedItem.avg_rating).toPrecision(3)}</p>
            </div>
          </div>
            <div className="imgBox">
              <a href={bookUrl}>
                <img src={coverUrl}/>
              </a>
            </div>
          <div className={"bookImgAfter" + this.hoverName()}/>
        </div>
        <p><a href={friendUrl}>{this.fname()}</a> added {this.props.feedItem.title} by {this.props.feedItem.author} to their "{this.props.feedItem.shelf_title}" shelf.</p>
        <p>{this.getTime()}</p>
      </div>
    );
  }

});
