$(function () {

  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;

  var rootEl = document.getElementById("content");

  // window.startUp = function() {
    React.render((
      <Router>
        <Route path="/" component={Home}/>
        <Route path="users" component={UserIndex}/>
        <Route path="books/:bookId" component={BookView}/>
        <Route path="shelves" component={ShelfIndex}/>
      </Router>
    ), rootEl);
  // };
});
