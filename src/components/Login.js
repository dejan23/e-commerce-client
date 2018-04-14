import React from 'react';
import { Field, reduxForm, isSubmitting } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



// -------------- validation ----------
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength45 = maxLength(45)
const requiredEmail = value => (value ? undefined : 'Please enter an email')
const requiredPassword = value => (value ? undefined : 'Please enter an password')
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

class Login extends React.Component {

  componentWillUnmount() {
  }

  submitForm = async (values) => {

  }


  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (

      <form className="form-container">
        <div className="form-wrapper">
          <div className="form-title">
            <h2>Login</h2>
          </div>

          <div className="form-email">
            <p>Email</p>
            <input type="text" placeholder="enter your email address" />
          </div>

          <div className="form-password">
            <p>Password</p>
            <input type="password" placeholder="enter your password" />
          </div>
        </div>

        <div className="form-submit">
          <button className="button button--register" type="submit" disabled={pristine || submitting}>Login</button>
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
          <p>Haven't received confirmation token? <Link to='/auth/resend'>Resend token</Link></p>
        </div>

        <div className="form-demoacc">
          <strong>demo account</strong>
          <br />
          user: demo@demo.com
          <br />
          password: demo
        </div>
      </form>
    );
  }
}


Login = connect()(Login);

export default reduxForm({
  form: 'login-form',
  submitting: isSubmitting('login-form')
})(Login)
