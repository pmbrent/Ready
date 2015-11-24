$(function () {

  window.Ready = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return { currentUser: null };
  },

  componentWillMount: function () {
    CurrentUserStore.addChangeListener(this._ensureLoggedIn);
    SessionsUtil.fetchCurrentUser();
  },

  _ensureLoggedIn: function () {
   if (!CurrentUserStore.isLoggedIn()) {
     this.history.pushState(null, "welcome");
   }

   this.setState({currentUser: CurrentUserStore.currentUser()});
  },

  componentWillUnmount: function() {
   CurrentUserStore.removeChangeListener(this._ensureLoggedIn);
  },

  render: function() {
    return(
      <div id="ready">
        <ReadyBar/>
        <div className="mainContent">
          { this.props.children }
        </div>
      </div>
    );
  }
  });

  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var rootEl = document.getElementById("content");

  React.render((
    <Router>
      <Route path="/" component={Ready}>
        <IndexRoute component={Home}/>
        <Route path="search" component={SearchResults}/>
        <Route path="updates" component={Updates}/>
        <Route path="shelves" component={UserShelves}/>
        <Route path="reviews" component={ComingSoon}/>
        <Route path="recommended" component={ComingSoon}/>
        <Route path="welcome" component={Welcome}/>
        <Route path="users/:userId" component={UserView}/>
        <Route path="users" component={UserIndex}/>
        <Route path="books/:bookId" component={BookView}/>
        <Route path="about" component={About}/>
      </Route>
    </Router>
  ), rootEl);
});
