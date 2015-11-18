$(function () {

  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;

  var rootEl = document.getElementById("content");

  var ReadyApp = React.createClass({

    redirect: function() {
      this.props.history.pushState(null, "books/3");
    },

    render: function() {
      return (
        <div className="coming_soon">
          Welcome! More is coming soon!
          <button onClick={this.redirect}>Click to view a book!</button>
          {this.props.children}
        </div>
      );
    }
  });

  // window.startUp = function() {
    React.render((
      <Router>
        <Route path="/" component={ReadyApp}/>
        <Route path="users" component={UserIndex}/>
        <Route path="books/:bookId" component={BookView}/>
      </Router>
    ), rootEl);
  // };
});
