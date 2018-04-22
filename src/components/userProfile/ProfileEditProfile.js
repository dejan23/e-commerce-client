import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSetUserUpdate, clearMessage2 } from '../../actions/user';


const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched &&
     error &&
     <div className="error">{error}</div>}
  </div>
)

const renderTextArea = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <textarea {...input} placeholder={label} type={type} />
    {touched &&
     error &&
     <div className="error">{error}</div>}
  </div>
)

const country = [ "Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium",
"Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China",
"Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia",
"Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea",
"Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait",
"Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius",
"Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway",
"Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite",
"Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland",
"Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates",
"United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe" ]
const renderCountrySelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">select country</option>
      {country.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
)

const city = ['Belgrade', 'New York', 'London']
const renderCitySelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">select city</option>
      {city.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
)

class ProfileEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentWillUnmount() {
    if(this.props.savedMessage) {
      this.props.clearMessage2();
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

    const { handleSubmit, pristine } = this.props;
    const usernameFromStorage = localStorage.getItem('username');
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
                <h2>Profile</h2>
                <p>Add information about yourself to share on your profile.</p>
              </div>
              <div className="profile-form-group">
                <div className="profile-form-item">
                  <p>First Name</p>
                  <Field
                    name="firstName"
                    type="text"
                    label="John"
                    component={renderField}
                  />
                </div>

                <div className="profile-form-item">
                  <p>Last Name</p>
                  <Field
                    name="lastName"
                    type="text"
                    label="Doe"
                    component={renderField}
                  />
                </div>
                <div className="profile-form-item">
                  <p>About me</p>
                  <Field
                    name="about"
                    type="text"
                    label="Write something interesting..."
                    component={renderTextArea}
                  />
                </div>
                <div className="profile-form-item">
                  <p>Country</p>
                  <Field
                    name="address.country"
                    type="text"
                    component={renderCountrySelector}
                    label="Location"
                  />
                </div>
                <div style={{marginBottom: '10px'}} className="profile-form-item">
                  <p>City</p>
                  <Field
                    name="address.city"
                    type="text"
                    component={renderCitySelector}
                    label="City"
                  />
                </div>
              </div>
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

ProfileEditForm = reduxForm({
  form: 'edit-profile',
  destroyOnUnmount: false
})(ProfileEditForm)

ProfileEditForm = connect(
  state => ({
    initialValues: state.user.user,
    savedMessage: state.user.savedMessage
  }),
  { startSetUserUpdate, clearMessage2 }
)(ProfileEditForm)

export default ProfileEditForm
