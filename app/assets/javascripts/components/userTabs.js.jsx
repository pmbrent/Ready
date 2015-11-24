window.UserTabs = React.createClass({

  activeTab: function(id) {
    if (this.props.active === id) {
      return "active";
    }
    return "";
  },

  render: function() {
    return(
      <div className="tabs group">
        <a href="#/" className={this.activeTab("updates")} id="updates">Updates</a>
        <a href="#/shelves" className={this.activeTab("shelves")} id="shelves">My Books</a>
        <a href="#/reviews" className={this.activeTab("reviews")} id="reviews">Reviews</a>
        <a href="#/recommended" className={this.activeTab("recommended")} id="recommended">Recommended</a>
      </div>
    );
  }

});
