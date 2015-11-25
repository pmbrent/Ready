window.RatingBox = React.createClass({

  getInitialState: function() {
    return ({ rating: this.props.rating || 0 });
  },

  onClick: function(e) {
    debugger
  },

  stars: function() {
    var stars = [];
    var i = 0;
    while (i < this.props.rating) {
      stars.push("★");
      i++;
    }
    while (i < 5) {
      stars.push("☆");
      i++;
    }
    return (
      <ul className="stars">
        {stars.map(function(star, index) {
          return (
            <li onClick={this.onClick} key={index+1}>
              {star}
            </li>);
        })}
      </ul>
    );
  },

  render: function() {
    return (
      <div className="ratingBox">
        {this.stars()}
      </div>
    );
  }

});
