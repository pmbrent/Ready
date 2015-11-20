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
        { this.props.children || <Home/> }
      </div>
    );
  }
  });

  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;

  var rootEl = document.getElementById("content");

  React.render((
    <Router>
      <Route path="/" component={Ready}>
        <Route path="search" component={SearchResults}/>
        <Route path="home" component={Home}>
          <Route path="updates" component={Updates}/>
          <Route path="/shelves" component={UserShelves}/>
          // Reviews
          // Recommended
        </Route>
        <Route path="welcome" component={Welcome}/>
        <Route path="users" component={UserIndex}/>
        <Route path="users/:userId" component={UserView}/>
        <Route path="books/:bookId" component={BookView}/>
        <Route path="about" component={About}/>
      </Route>
    </Router>
  ), rootEl);
});
