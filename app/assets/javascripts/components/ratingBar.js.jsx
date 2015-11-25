window.RatingBar = React.createClass({

  getInitialState: function() {
    var rating;
    if (this.props.rating) {
      rating = parseInt(this.props.rating);
    } else {
      rating = 0;
    }

    return ({
      rating: rating,
      filled: rating
     });
  },

  componentWillReceiveProps: function(props) {
    var rating;
    if (props.rating) {
      rating = parseInt(props.rating);
    } else {
      rating = 0;
    }

    this.setState({
      rating: rating,
      filled: rating
    });
  },

  onClick: function(e) {
    ApiUtil.rateBook(this.props.bookId, parseInt(e.currentTarget.id));
  },

  // fillStars: function(num) {
  //   this.setState({filled: num});
  // },
  //
  // revertStars: function() {
  //   this.setState({filled: this.state.rating});
  // },

  stars: function() {
    var stars = [];
    var i = 0;
    var bar = this;

    while (i < this.state.filled) {
      stars.push("★");
      i++;
    }
    while (i < 5) {
      stars.push("☆");
      i++;
    }
    return (
      <ul className="stars group">
        {stars.map(function(star, index) {
          return (
            <li key={index+1}
              id={index+1}
              onClick={bar.onClick}>
              {star}
            </li>);
        })}
      </ul>
    );
  },


  // onMouseEnter={bar.fillStars(index+1)}
  // onMouseLeave={bar.revertStars()}

  render: function() {
    var rateString;
    if (this.state.rating) {
      rateString = "My Rating:";
    } else {
      rateString = "Rate:";
    }

    return (
      <div className="ratings group">
        <p>{rateString}</p>
        <div className="ratingBar">
          {this.stars()}
        </div>
      </div>
    );
  }

});
