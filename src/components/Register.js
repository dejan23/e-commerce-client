import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// -------------- validation ----------
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength45 = maxLength(45)
const requiredEmail = value => (value ? undefined : 'Please enter an email')
const requiredPassword = value => (value ? undefined : 'Please enter an password')
const requiredPasswordConfirm = value => (value ? undefined : 'Please enter an password confirmation')
const matchPassword = (value, values) => ( value === values.password ? undefined : 'Passwords must match')
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
// -------------- end validation --------

const renderInput = field =>
  <div>
    <input className="input" {...field.input} type={field.type}/>
    {field.meta.touched &&
     field.meta.error &&
     <div className="error">{field.meta.error}</div>}
  </div>

class Register extends Component {

  componentWillUnmount() {
  }

  submitForm = values => {

  }




  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form className="form-container">
        <div className="form-wrapper">
          <div className="form-title">
            <h2>Registration</h2>
          </div>

          <div className="form-username">
            <p>Username</p>
            <input type="text" placeholder="johndoe3" />
          </div>

          <div className="form-email">
            <p>Email</p>
            <input type="text" placeholder="johndoe@outcast.com" />
          </div>

          <div className="form-password">
            <p>Password</p>
            <input type="password" placeholder="min 3 characters" />
          </div>

          <div className="form-password">
            <p>Confirm password</p>
            <input type="password" placeholder="confirm password" />
          </div>
        </div>
        
        <div className="form-submit">
          <button className="button button--register" type="submit" disabled={pristine || submitting}>Register</button>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
          <p>Haven't received confirmation token? <Link to='/auth/resend'>Resend token</Link></p>
        </div>

      </form>
    );
  }
}



Register = connect()(Register);

export default reduxForm({
  form: 'registerForm'
  // validate: validate
})(Register);
