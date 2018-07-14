import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <div className="soc">
                <a href="#"><i className="fa fa-github-alt fa-2x" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-youtube fa-2x" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></a>
              </div>
              <p>
                <strong>Bulma</strong> by
                <a href="http://jgthms.com">Jeremy Thomas</a>.
                The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
                <br />
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;