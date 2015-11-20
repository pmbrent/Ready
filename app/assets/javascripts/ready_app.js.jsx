$(function () {

  window.Ready = React.createClass({
    // get and store current user
          // {this.props.children}

    render: function() {
      return(
        <div id="ready">
          <ReadyBar/>
          <div id="content">
            "Here's Ready!"
          </div>
        </div>
      );
    }
  });

  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;

  var rootEl = document.getElementById("content");

  React.render((
    <Router>
      // <Route path="/" component={Ready}>
        <Route path="home/" component={Home}>
          <Route path="updates" component={Updates}/>
          <Route path="shelves" component={UserShelves}/>
          // Reviews
          // Recommended
        </Route>
        <Route path="users" component={UserIndex}/>
        <Route path="users/:userId" component={UserView}/>
        <Route path="books/:bookId" component={BookView}/>
        <Route path="about" component={About}/>
      // </Route>
    </Router>
  ), rootEl);
});
