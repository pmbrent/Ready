$(function () {

  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;

  var rootEl = document.getElementById("content");

  // window.startUp = function() {
    React.render((
      <Router>
        <Route path="/" component={Home}>
          <Route path="updates" component={Updates}/>
          <Route path="shelves" component={UserShelves}/>
          // Reviews
          // Recommended
        </Route>
        <Route path="users" component={UserIndex}/>
        <Route path="users/:userId" component={UserView}/>
        <Route path="books/:bookId" component={BookView}/>
      </Router>
    ), rootEl);
  // };
});
