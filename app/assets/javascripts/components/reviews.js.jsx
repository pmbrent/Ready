window.Reviews = React.createClass({

  getInitialState: function() {
    return {
      reviews: BookStore.rated()
    };
  },

  componentDidMount: function() {
    BookStore.addChangeListener(this.updateReviews);
    if (this.state.reviews.length === 0) {
      ApiUtil.fetchBooks();
    }
  },

  updateReviews: function() {
    this.setState({
      reviews: BookStore.rated()
    });
  },

  componentWillUnmount: function() {
    BookStore.removeChangeListener(this.updateReviews);
  },

  render: function() {
    return (
      <div>
        <UserTabs active="reviews"/>
        <div className="reviewsPage group">
          <div className="reviewsList bodyContainer">
            {this.state.reviews.map(function(book) {
              return <ReviewItem key={book.id} book={book}/>;
            })}
          </div>
          <div className="sideColumn reviewsColumn">
            <div className="sideBox">
              Review books as you read them to improve the accuracy of recommendations.
            </div>
          </div>
        </div>
      </div>
    );

  }

});
