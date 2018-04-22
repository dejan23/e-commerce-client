import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, clearAlert } from '../actions/auth';

// -------------- validation ----------
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength20 = maxLength(20)
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength3 = minLength(3)
const requiredEmail = value => (value ? undefined : 'Please enter an email')
const requiredUsername = value => (value ? undefined : 'Please enter a username')
const requiredPassword = value => (value ? undefined : 'Please enter a password')
const requiredPasswordConfirm = value => (value ? undefined : 'Please enter a password confirmation')
const matchPassword = (value, values) => ( value === values.password ? undefined : 'Passwords must match')
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
// -------------- end validation --------

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched &&
     error &&
     <div className="error">{error}</div>}
  </div>
)

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentWillUnmount() {
    this.props.clearAlert();
  }

  submitForm = values => {
    this.setState({
      isLoading: true
    })
    this.props.registerUser(values)
      .then(success => {
       if(success === true) {
         return this.props.history.push('/')
       }
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

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form className="form-container" onSubmit={handleSubmit(this.submitForm.bind(this))}>
        <div className="form-wrapper">
          <div className="form-title">
            <h2>Registration</h2>
          </div>

          <div className="form-username">
            <p>Username</p>
            <Field
              name="username"
              type="text"
              label="johndoe3"
              validate={[requiredUsername, maxLength20, minLength3]}
              component={renderField}
            />
          </div>

          <div className="form-email">
            <p>Email</p>
            <Field
              name="email"
              type="text"
              label="johndoe@outcast.com"
              validate={[requiredEmail, email, maxLength20]}
              component={renderField}
            />
          </div>

          <div className="form-password">
            <p>Password</p>
            <Field
              name="password"
              type="password"
              label="min 3 characters"
              validate={[requiredPassword, maxLength20, minLength3]}
              component={renderField}
            />
          </div>

          <div className="form-password">
            <p>Confirm password</p>
            <Field
              name="passwordConfirm"
              type="password"
              label="confirm password"
              validate={[requiredPasswordConfirm, matchPassword]}
              component={renderField}
            />
          </div>
        </div>
        {this.renderAlert()}

        <div className="form-submit">
          <button className="button button--register" type="submit" disabled={this.state.isLoading || pristine}>Register</button>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
          <p className="form-demoacc">Haven't received confirmation token? <Link to='#'>Resend token</Link></p>
        </div>

      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

Register = connect(mapStateToProps, { registerUser, clearAlert })(Register);

export default reduxForm({
  form: 'registerForm'
})(Register);
