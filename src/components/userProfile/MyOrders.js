import React from 'react';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class MyOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: `http://localhost:8080/user/${props.user.username}`,
      copied: false,
    };
  }

  render() {
    const username = localStorage.getItem('username');
    const { user } = this.props;

    return (
      <div className="profile-wrapper">
        <div className="profile">
          <div className="profile-options-left">
            <div className="profile-options-title">
              <h2>My Orders</h2>
              <p>List of your orders.</p>
            </div>

            <div className="profile-options-content">

              <p style={{textAlign: 'center', opacity: '0.5', marginTop: '90px'}}><i>Your cart is empty. Keep shopping to find a product!</i></p>
            </div>

          </div>

          <div className="profile-right">
            <div className="profile-settings-container">
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/${username}`}>Profile Page</NavLink>
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/edit-profile`}>Profile Settings</NavLink>
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/my-orders`}>My orders</NavLink>
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/my-products`}>My products</NavLink>
            </div>
            <div className="profile-settings-container">
              <div className="profile-settings-container-stats">
                <h3>Stats</h3>
                <p>0 products in cart</p>
                <Link to={`/`}>Keep shopping</Link>
                <Link to={`#`}>View your wishlist</Link>
              </div>
            </div>

            <div className="profile-settings-container">
              <h3>Profile Link</h3>
              <input value={this.state.value} disabled onChange={({target: {value}}) => this.setState({value, copied: false})} />
              <CopyToClipboard text={this.state.value}
                onCopy={() => this.setState({copied: true})}>
                <button className="profile-link-button">Copy link</button>
              </CopyToClipboard>
              {this.state.copied ? <span style={{color: '#e54f52'}}>Copied</span> : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default MyOrders;
