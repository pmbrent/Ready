$(function () {

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var rootEl = document.getElementById("content");

var ReadyApp = React.createClass({
  render: function() {
    return (
      <div className="coming_soon">
        Welcome! More is coming soon!
      </div>);
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
