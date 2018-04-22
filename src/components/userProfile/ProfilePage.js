import React from 'react';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class ProfilePage extends React.Component {
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
          <div className="profile-left">
            <div className="profile-personal">
              <div className="profile-personal-avatar">
                <img src={`${user.picture}`}></img>
              </div>
              <div className="profile-personal-info">
                <div className="profile-perosnal-name">
                  <h3>{user.firstName || user.lastName ?
                        <span className="profile-perosnal-name-title">{user.firstName} {user.lastName}</span> :
                        <i style={{opacity: '0.5'}}>name not set...</i>
                      } <span>- {user.username}</span></h3>
                </div>
                <div className="profile-perosnal-location">
                  <div><i className="fas fa-sm fa-map-marker-alt"></i>
                  {
                    !user.address.city && !user.address.country ?
                    <i style={{opacity: '0.5'}}> location not set</i> :
                    <span> {user.address.city}, {user.address.country}</span>

                  } - {moment().format('HH:mm')} local time
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-about-me">
              <div><h2>About me</h2></div>
              <div className="profile-about-me-content">
                <p>{user.about || <i style={{opacity: '0.5'}}>Still haven't wrote anything...</i>}</p>
              </div>
              <hr/>
            </div>
            <div className="profile-contact">
              <div className="profile-contact-item">
                <h3>Contact at</h3>
                <i>{user.email}</i>
              </div>
              <div className="profile-contact-item">
                <h3>Listed Products</h3>
                <i>{
                    !user.products ?
                    <span>0</span> :
                    <span>{user.products.length}</span>
                  }</i>
              </div>
              <div className="profile-contact-item">
                <h3>Joined</h3>
                <span><i>{moment(user.createdAt).format('MMMM Do, YYYY')}</i></span>
              </div>
            </div>
          </div>

          <div className="profile-right">
            <div className="profile-settings-container">
              { username === user.username ?
                 (<div>
                   <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/edit-profile`}>Profile Settings</NavLink>
                   <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/my-orders`}>My orders</NavLink>
                   <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/my-products`}>My products</NavLink>
                 </div>) :
                 (<div>
                   <Link className="profile-settings" to={`/user/${user.username}/products`}>Show all products</Link>
                 </div>)

              }
            </div>
            <div className="profile-settings-container">
              <h3>Languages</h3>
              <span>English</span><br />
              <span>Serbian</span>
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

export default ProfilePage;
