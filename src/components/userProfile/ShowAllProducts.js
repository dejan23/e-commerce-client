import React from 'react';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as actions from '../../actions/user';
import { connect } from 'react-redux';
import ProductListItem from './ProductListItem';
import LoadingPage from '../LoadingPage';

class ShowAllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: `http://localhost:8080/user/${this.props.match.params.id}`,
      copied: false,
    };
  }
  componentWillMount() {
    this.props.startSetUserProducts(this.props.match.params.id)
    this.props.startSetUser(this.props.match.params.id)
  }

  render() {
    if(this.props.loading) {
      return <LoadingPage />
    }
    const username = localStorage.getItem('username');
    const { user } = this.props;

    return (
      <div className="profile-wrapper">
        <div className="profile">
          <div className="profile-options-left">
            <div className="profile-options-title">
              <h2>{this.props.match.params.id}</h2>
              <p>List of {this.props.match.params.id}'s products.</p>
            </div>

            <div className="profile-options-content">

              {
                !this.props.products || this.props.products.length === 0 ?
                ( <p style={{textAlign: 'center', opacity: '0.5', marginTop: '90px'}}><i>Your products list is empty!</i></p> ) :
                (
                  this.props.products.map((product) => {
                    return <ProductListItem key={product._id} {...product} />
                  })
                )
              }
            </div>

          </div>

          <div className="profile-right">
            <div className="profile-settings-container">
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/${this.props.match.params.id}`}>Go see user's profile</NavLink>
            </div>
            <div className="profile-settings-container">
              <div className="profile-settings-container-stats">
                <h3>Info</h3>
                <p>{
                    !this.props.products ?
                    <span>no</span> :
                    <span><i className="fas fa-list-ol"></i> {this.props.products.length} </span>
                   }
                  products listed
                </p>
                <p>{
                    !this.props.user ?
                    <span>loading...</span> :
                    <span><i className="fas fa-envelope"></i> {this.props.user.email} </span>
                   }
                </p>
                <p>{
                    !this.props.user ?
                    <span>loading...</span> :
                    <span><i className="fas fa-sm fa-map-marker-alt"></i> {this.props.user.address.city}, {this.props.user.address.country} </span>
                   }
                </p>
                <p>{
                    !this.props.user ?
                    <span>loading...</span> :
                    <span><i className="fas fa-calendar-alt"></i> Joined: {moment(this.props.user.createdAt).format('MMMM Do, YYYY')} </span>
                   }
                </p>
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
  loading: state.user.productsIsLoading,
  user: state.user.user,
  loading: state.user.userIsLoading
})

export default connect(mapStateToProps, actions)(ShowAllProducts);
