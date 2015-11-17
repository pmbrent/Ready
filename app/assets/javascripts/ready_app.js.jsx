$(function () {

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var rootEl = document.getElementById("content");

var ReadyApp = React.createClass({
  render: function() {
    return (
      <div>
        "It's working!"
      </div>
    );
  }
});

React.render((
  <Router>
    <Route path="/" component={ReadyApp}>
    </Route>
  </Router>
), rootEl);

});
