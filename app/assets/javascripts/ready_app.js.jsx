$(function () {

  window.Ready = React.createClass({
    getInitialState: function () {
     return { currentUser: null };
   },

   mixins: [ReactRouter.History],

   componentWillMount: function () {
     CurrentUserStore.addChangeHandler(this._ensureLoggedIn);
     SessionsUtil.fetchCurrentUser();
   },

   _ensureLoggedIn: function () {
     if (!CurrentUserStore.isLoggedIn()) {
       this.history.pushState(null, "welcome");
     }

     this.setState({currentUser: CurrentUserStore.currentUser()});
   },

    render: function() {
      return(
        <div id="ready">
          <ReadyBar/>
          <div id="content">
            { this.props.children || <Home/> }
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
      <Route path="/" component={Ready}>
        <Route component={Home}>
          <Route path="updates" component={Updates}/>
          <Route path="shelves" component={UserShelves}/>
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
