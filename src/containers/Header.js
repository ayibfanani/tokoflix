import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Header extends Component {
  render() {
    let purchased_movies = this.props.movies.purchased;
    let balance_amount = this.props.balance.amount;

    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="../">
              <img src="https://dansup.github.io/bulma-templates/images/bulma.png" alt="Logo" />
            </a>
            <span className="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end">
              <Link to={`/`} className="navbar-item is-active">
                Home
              </Link>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  {purchased_movies.length}&nbsp;<i className="fa fa-film"></i>&nbsp;Items
                </a>
                <div className="navbar-dropdown">
                  <a className="navbar-item">
                    Balance: Rp. {balance_amount}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    balance: state.balance
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)