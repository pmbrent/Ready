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
   this.forceUpdate();
  },

  componentWillUnmount: function() {
   CurrentUserStore.removeChangeListener(this._ensureLoggedIn);
  },

  maybeBackground: function() {
    if (this.props.location.pathname=="/welcome") {
      return " library";
    } else {
      return "";
    }
  },

  render: function() {
    return(
      <div id="ready">
        <ReadyBar/>
        <div className={"mainContent" + this.maybeBackground()}>
          { this.props.children }
        </div>
        <FooterBar/>
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
        <IndexRoute component={Updates}/>
        <Route path="search" component={BookSearchResults}/>
        <Route path="shelves" component={UserShelves}/>
        <Route path="reviews" component={Reviews}/>
        <Route path="recommended" component={Recommended}/>
        <Route path="welcome" component={Welcome}/>
        <Route path="directory" component={UserIndex}/>
        // <Route path="users/search" component={UserSearchResults}/>
        <Route path="users/:userId/shelves" component={ShelfIndex}/>
        <Route path="users/:userId" component={UserView}/>
        <Route path="books/:bookId" component={BookView}/>
        // <Route path="about" component={About}/>
      </Route>
    </Router>
  ), rootEl);
});
