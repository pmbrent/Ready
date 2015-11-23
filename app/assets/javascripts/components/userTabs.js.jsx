window.UserTabs = React.createClass({

  componentDidMount: function() {
    $(function() {
      $('.tabs').tabs();
    });
  },

  render: function() {
    return(
      <div className="tabs group">
        <a href="#/updates" id="updates">Updates</a>
        <a href="#/shelves" id="shelves">My Books</a>
        <a href="#/reviews" id="reviews">Reviews</a>
        <a href="#/recommended" id="recommended">Recommended</a>
      </div>
    );
  }

});
