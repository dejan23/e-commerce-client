import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends React.Component {
  renderLinks() {
      return (
        <div  className="auth">
          {/* <Link className="button" to="/create">Post an product</Link> */}
          <Link className="button-cart" to="/cart"><i className="fa fa-lg fa-shopping-cart"></i></Link>
          <Link className="button" to="/login">Login</Link>
          <Link className="button button--register" to="/register" >Register</Link>
        </div>
      )
    }


  render() {
    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
              <ul>
                <li>
                  <Link className="header__brand" to="/">
                    <span>eCommerce </span>App
                  </Link>
                </li>
                <li>
                  <input type="text" placeholder="not in function..." />
                </li>
              </ul>
              {this.renderLinks()}
          </div>
        </div>
      </header>
    )
  }
}



export default connect()(Header);
