$(function () {

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var rootEl = document.getElementById("content");

var ReadyApp = React.createClass({
  render: function() {
    return <userIndex/>
  }
});

React.render((
  <Router>
    <Route path="/" component={ReadyApp}>
    </Route>
  </Router>
), rootEl);

});
