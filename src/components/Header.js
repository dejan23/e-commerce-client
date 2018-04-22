import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends React.Component {
  renderLinks () {
    const username = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatar');
    if(this.props.authenticated) {
      return (
        <div className="header-content-right">
          <div className="header-cart"><Link to="/"><i className="fas fa-lg fa-shopping-cart"></i></Link></div>
          <div className="dropdown">
            <button className="dropbtn"><img src={avatar}></img> {username} <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link to={`/user/${username}`}><i className="fas fa-user"></i> Profile</Link>
              <Link to={`/user/edit-profile`}><i className="fas fa-cog"></i> Settings</Link>
              <Link to="/logout"><i className="fas fa-sign-out-alt"></i> Logout</Link>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="header-content-right">
          <Link className="button" to="/login">Login</Link>
          <Link className="button button--register" to="/register" >Register</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <header className="header">
        <div className="content-container">
          <div className="header-content">

              <div className="header-content-left">
                <div className="header-brand">
                  <Link to="/">
                    <span>ecomm</span>App
                  </Link>
                </div>
                <div className="header-search">
                  <input type="text" placeholder="not in function..." />
                </div>
                <div className="header-goback">
                  <a href="http://www.beoapps.com">
                    <span>Go back to Beoapps</span>
                  </a>
                </div>
              </div>

              {this.renderLinks()}

          </div>
        </div>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user.userIsLoading // just a trick to update username in the header when updated in profile settings, idk if its good solution but hey, it works
  }
}

export default connect(mapStateToProps)(Header);
