window.FeedItem = React.createClass({

  render: function() {
    var coverUrl = "http://covers.openlibrary.org/b/isbn/" +
                    this.props.feedItem.isbn + "-S.jpg";

    return (
      <div className="feedItem">
        <img src={coverUrl}></img>
        <p>{this.props.feedItem.friend} added {this.props.feedItem.title} by
          {this.props.feedItem.author} to their "{this.props.feedItem.shelf_title}" shelf.</p>
      </div>
  );
  }

});
