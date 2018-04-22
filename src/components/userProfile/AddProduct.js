import React from 'react';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as actions from '../../actions/product';

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
const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const FileInput = ({ input: { value: omitValue, onChange, onBlur, ...inputProps, },
  meta: omitMeta,
  ...props,
}) =>
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: `http://localhost:8080/user/${props.user.username}`,
      copied: false,
      isLoading: false
    };
  }

  componentWillMount() {
     this.props.startSetCategories()
  }

  renderCategorySelector = ({ input, meta: { touched, error } }) => {

        return (
          <div>
            <select {...input}>
              <option value="">select category</option>
              {!this.props.categories ? (
                <option value="">loading...</option>
              ) : (
                this.props.categories.map(category => <option value={category._id} key={category._id}>{category.name}</option>)
              )
            }
            </select>
            {touched && error && <span>{error}</span>}
          </div>
        )
  }

  submitForm = values => {
    this.setState({
      isLoading: true
    })
    this.props.startAddProduct(values)
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
    const username = localStorage.getItem('username');
    const { user } = this.props;
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="profile-wrapper">
        <div className="profile">
          <form className="profile-addproduct-left" onSubmit={handleSubmit(this.submitForm.bind(this))}>
            <div className="profile-addproduct-title">
              <h2>New Product</h2>
              <p>Fill out the form.</p>
            </div>
            <div className="profile-form-group">
              <div className="profile-form-item">
                <p>Title</p>
                <Field
                  name="title"
                  type="text"
                  label="title of a product"
                  component={renderField}
                />
              </div>

              <div className="profile-form-item">
                <p>Category</p>
                <Field
                  name="categoryId"
                  type="text"
                  component={this.renderCategorySelector}
                  label="category"
                />
              </div>

              <div className="profile-form-item">
                <p>Price</p>
                <Field
                  name="price"
                  type="number"
                  label="price is in $"
                  component={renderField}
                />
              </div>
              <div className="profile-form-item">
                <p>Description</p>
                <Field
                  name="description"
                  type="text"
                  label="Write some interesting..."
                  component={renderTextArea}
                />
              </div>

              <div className="profile-form-item">
                <p>Image</p>
                <Field
                  name="product_picture"
                  component={FileInput}
                />
              </div>

            </div>
            <div className="profile-addproduct-form-submit">
              <button className="button button--register" type="submit" disabled={this.state.isLoading || pristine}>Submit New Product</button>
            </div>
          </form>

          <div className="profile-right">
            <div className="profile-settings-container">
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/${username}`}>Profile Page</NavLink>
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/edit-profile`}>Profile Settings</NavLink>
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/my-orders`}>My orders</NavLink>
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/my-products`}>My products</NavLink>
            </div>
            <div className="profile-settings-container">
              <div className="profile-settings-container-stats">
                <h3>Rules for posting</h3>
                <p>- Write interesting description</p>
                <p>- Choose nice photo</p>
                <p>- Price is in dollars</p>
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

const mapStateToProps = (state, props) => ({
  categories: state.user.categories,
})

AddProduct = connect(mapStateToProps, actions)(AddProduct);

export default reduxForm({
  form: 'addproduct-form'
})(AddProduct)
