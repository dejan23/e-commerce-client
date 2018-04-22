import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSetUserUpdate } from '../../actions/user';


const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched &&
     error &&
     <div className="error">{error}</div>}
  </div>
)


class ProfileEditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  submitForm = values => {
    this.setState({
      isLoading: true
    })
    this.props.startSetUserUpdate(values)
      .then(() => {
       this.setState({
         isLoading: false
      })

     })
      .catch(err => {
        this.setState({
          isLoading: false
        })
      })
  }

  render() {

    const { handleSubmit, pristine, disabled } = this.props;
    const usernameFromStorage = localStorage.getItem('username');
    const emailFromStorage = localStorage.getItem('email');
    const avatar = localStorage.getItem('avatar');
    return (
      <form className="profile-form-wrapper" onSubmit={handleSubmit(this.submitForm.bind(this))}>
        <div className="profile-form">
          <div className="profile-form-top">
            <div className="profile-form-left">
              <div className="profile-form-left-avatar">
                <img src={avatar}></img>
              </div>
              <div className="profile-form-left-username">
                <h3>{usernameFromStorage}</h3>
              </div>
              <div>
                <NavLink activeClassName="profile-form-menu-active" className="profile-form-left-menu" to={`/user/${usernameFromStorage}`}>View Public Profile</NavLink>
                <NavLink activeClassName="profile-form-menu-active" className="profile-form-left-menu" to={`/user/edit-profile`}>Profile</NavLink>
                <NavLink activeClassName="profile-form-menu-active" className="profile-form-left-menu" to={`/user/edit-picture`}>Photo</NavLink>
                <NavLink activeClassName="profile-form-menu-active" className="profile-form-left-menu" to={`/user/edit-account`}>Account</NavLink>

              </div>
            </div>

            <div className="profile-form-right">
              <div className="profile-form-title">
                <h2>Photo</h2>
                <p>Add a nice photo for your profile.</p>
              </div>
              <div className="profile-form-item-email">
                <div>
                  <p>Add / Change Image:</p>
                  <input type="file" disabled />
                </div>
              </div>
              <div className="profile-form-group">



              </div>
            </div>
          </div>
          <div className="profile-form-bottom">
            <div className="profile-form-button">
            <button type="submit" className="button button--register" disabled={this.state.isLoading || pristine}>Save</button>
            </div>
          </div>

        </div>
      </form>
    );
  }
}

ProfileEditAccount = reduxForm({
  form: 'edit-picture'
})(ProfileEditAccount)

ProfileEditAccount = connect(null, { startSetUserUpdate })(ProfileEditAccount)

export default ProfileEditAccount
