window.FeedItem = React.createClass({

  render: function() {
    var coverUrl = "http://covers.openlibrary.org/b/isbn/" +
                    this.props.feedItem.isbn + "-S.jpg";
    var friendUrl = "#/users/" + this.props.feedItem.friend_id;

    return (
      <div className="feedItem group">
        <div className="imgBox"><img src={coverUrl}/></div>
        <p><a href={friendUrl}>{this.props.feedItem.friend}</a> added {this.props.feedItem.title} by
          {this.props.feedItem.author} to their "{this.props.feedItem.shelf_title}" shelf.</p>
      </div>
    );
  }

});
