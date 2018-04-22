import React from 'react';
import { Field, reduxForm, isSubmitting } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, clearAlert } from '../actions/auth';


// -------------- validation ----------
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength45 = maxLength(45)
const requiredEmail = value => (value ? undefined : 'Please enter an email')
const requiredPassword = value => (value ? undefined : 'Please enter a password')
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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentWillUnmount() {
    return this.props.clearAlert();
  }

  submitForm = values => {
    this.setState({
      isLoading: true
    })
    this.props.loginUser(values)
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
            <h2>Login</h2>
          </div>

          <div className="form-email">
            <p>Email</p>
            <Field
              name="email"
              type="text"
              label="enter your email address"
              validate={[requiredEmail, email, maxLength45]}
              component={renderField}
            />
          </div>

          <div className="form-password">
            <p>Password</p>
            <Field
              name="password"
              type="password"
              label="enter your password"
              validate={requiredPassword}
              component={renderField}
            />
          </div>
        </div>
        {this.renderAlert()}
        <div className="form-submit">
          <button className="button button--register" type="submit" disabled={this.state.isLoading || pristine}>Login</button>
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
          <p className="form-demoacc">Haven't received confirmation token? <Link to='#'>Resend token</Link></p>
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

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

Login = connect(mapStateToProps, { loginUser, clearAlert })(Login);

export default reduxForm({
  form: 'login-form'
})(Login)
