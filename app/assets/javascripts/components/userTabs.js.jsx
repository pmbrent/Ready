window.UserTabs = React.createClass({

  render: function() {
    return(
      <div className="tabs group">
        <a href="#/updates" id="updates">Updates</a>
        <a href="#/shelves" id="shelves">My Books</a>
        <a href="#" id="reviews">Reviews</a>
        <a href="#" id="recommended">Recommended</a>
      </div>
    );
  }

});
