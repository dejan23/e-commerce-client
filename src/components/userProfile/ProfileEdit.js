import React from 'react';
import { connect } from 'react-redux';
import ProfileEditProfile from './ProfileEditProfile';
import ProfileEditAccount from './ProfileEditAccount';
import ProfileEditPicture from './ProfileEditPicture';
import { startSetUserProfile } from '../../actions/user'
import FlashMessage from '../FlashMessage';


export class ProfileEdit extends React.Component {
  componentWillMount() {
    this.props.startSetUserProfile()
  }

  renderComponent() {
    if(this.props.match.url === "/user/edit-profile") {
      return (
        <ProfileEditProfile />
      )
    }

    if(this.props.match.url === "/user/edit-account") {
      return (
        <ProfileEditAccount />
      )
    }

    if(this.props.match.url === "/user/edit-picture") {
      return (
        <ProfileEditPicture />
      )
    }

  }

  render() {
    return (
      <div>
          <FlashMessage />
          {this.renderComponent()}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user: state.user.user
})

export default connect(null, { startSetUserProfile })(ProfileEdit)
