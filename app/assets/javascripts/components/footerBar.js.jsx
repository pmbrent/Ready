window.FooterBar = React.createClass({

  render: function() {
    return (
      <div className="footer">
        <div className="nav group">
          <div className="copyright group">
            <p>© 2015 Patricia M. Brent</p>
            <p><a href="mailto:info@readybooks.com">Contact</a></p>
          </div>
          <ul className="footerLinks group">
            <li>With thanks to:</li>
            <li>
              <a href="https://openlibrary.org">OpenLibrary</a>
            </li>
            <li>
              <a href="http://www.worldcat.org">WorldCat</a>
            </li>
            <li>
              <a href="https://www.goodreads.com/">GoodReads</a>
            </li>
            <li>
              <a href="https://www.amazon.com/">Amazon</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

});
