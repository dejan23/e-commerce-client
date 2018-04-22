import React from 'react';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as actions from '../../actions/user';
import { connect } from 'react-redux';
import ProductListItem from './ProductListItem';
import LoadingPage from '../LoadingPage';

class MyProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: `http://localhost:8080/user/${props.user.username}`,
      copied: false,
    };
  }
  componentWillMount() {
     this.props.startSetMyProducts()
  }

  render() {
    if(this.props.loading) {
      return <LoadingPage />
    }
    const username = localStorage.getItem('username');

    return (
      <div className="profile-wrapper">
        <div className="profile">
          <div className="profile-options-left">
            <div className="profile-options-title">
              <h2>My Products</h2>
              <p>List of your products.</p>
            </div>

            <div className="profile-options-content">
              {!this.props.products ? (
                <p style={{textAlign: 'center', opacity: '0.5', marginTop: '90px'}}><i>You have not posted any products yet!</i></p>
              ) : (
                this.props.products.map((product) => {
                  return <ProductListItem key={product._id} {...product} {...this.props.match} />
                })
              )
              }
            </div>

          </div>

          <div className="profile-right">
            <div className="profile-settings-container">
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/${username}`}>Profile Page</NavLink>
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/edit-profile`}>Profile Settings</NavLink>
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/my-orders`}>My orders</NavLink>
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/my-products`}>My products</NavLink>
            </div>
            <div className="profile-settings-container">
              <div className="profile-settings-container-stats">
                <h3>Stats</h3>
                <p>{
                    !this.props.products ?
                    <span>no</span> :
                    <span><i className="fas fa-list-ol"></i> {this.props.products.length} </span>
                   }
                  products listed
                </p>
                <Link to={`/user/add-product`}><i className="fas fa-plus"></i> Add New Product</Link>
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
  products: state.user.products,
  loading: state.user.productsIsLoading

})

export default connect(mapStateToProps, actions)(MyProducts);
