window.Home = React.createClass({

  render: function() {
    return (
      <div className="home">
        <UserTabs/>
        {this.props.children || <Updates/>}
      </div>
    );
  }
});
