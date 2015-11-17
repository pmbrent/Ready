$(function () {

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var rootEl = document.getElementById("content");

var ReadyApp = React.createClass({
  render: function() {
    return <UserIndex/>;
  }
});

React.render((
  <Router>
    <Route path="/" component={ReadyApp}>
      <Route path="/users" component={UserIndex}/>
    </Route>
  </Router>
), rootEl);

});
