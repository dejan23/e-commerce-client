import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSetUserUpdate } from '../../actions/user';
import { startSetResetPassword, clearAlert } from '../../actions/auth';

// -------------- validation ----------
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength20 = maxLength(20)
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength3 = minLength(3)
const requiredPassword = value => (value ? undefined : 'Please enter a password')
const requiredPasswordConfirm = value => (value ? undefined : 'Please enter a password confirmation')
const matchPassword = (value, values) => ( value === values.newPassword ? undefined : 'Passwords must match')
// -------------- end validation --------


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
      isLoading: false,
      doneMessage: false
    };
  }

  componentWillUnmount() {
    if(this.props.errorMessage) {
      this.props.clearAlert();      
    }
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  renderMessage() {
    if(this.props.savedMessage) {
      return (
        <div className="success-short">
          {this.props.savedMessage}
        </div>
      )
    }
  }

  submitForm = values => {
    this.setState({
      isLoading: true
    })
    this.props.startSetResetPassword(values)
      .then(response => {
        if(response) {
          this.setState({
            isLoading: false
          })
        }
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
                <h2>Account</h2>
                <p>Edit your account settings and change your password here.</p>
              </div>
              <div className="profile-form-item-email">
                <div>
                  <p>Email can not be changed</p>
                  <input value={emailFromStorage} disabled />
                </div>
              </div>
              <div className="profile-form-group">

                <div style={{marginBottom: '10px'}} className="profile-form-item">
                  <p>Enter current password:</p>
                  <Field
                    name="currentPassword"
                    type="password"
                    label="Enter Current Password"
                    validate={[requiredPassword, maxLength20, minLength3]}
                    component={renderField}
                  />
                </div>
                <div style={{marginBottom: '10px'}} className="profile-form-item">
                  <p>Choose new password:</p>
                  <Field
                    name="newPassword"
                    type="password"
                    label="Enter New Password"
                    validate={[requiredPassword, maxLength20, minLength3]}
                    component={renderField}
                  />
                </div>
                <div style={{marginBottom: '10px'}} className="profile-form-item">
                  <Field
                    name="newPasswordConfirm"
                    type="password"
                    label="Re-type New Password"
                    validate={[requiredPasswordConfirm, matchPassword]}
                    component={renderField}
                  />
                </div>
              </div>
              {this.renderAlert()}
              {this.renderMessage()}
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

const mapStateToProps = (state, props) => ({
  errorMessage: state.auth.error,
  savedMessage: state.auth.message
})

ProfileEditAccount = reduxForm({
  form: 'edit-account',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ProfileEditAccount)

ProfileEditAccount = connect(mapStateToProps, { startSetUserUpdate, startSetResetPassword, clearAlert })(ProfileEditAccount)

export default ProfileEditAccount
