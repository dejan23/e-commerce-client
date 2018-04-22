import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Link, NavLink } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as actions from '../../actions/product';
import { connect } from 'react-redux';
import ProductListItem from './ProductListItem';
import LoadingPage from '../LoadingPage';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: `http://localhost:8080/${this.props.match.params.id}`,
      copied: false,
    };
  }
  componentWillMount() {
  }

  render() {
    if(this.props.loading) {
      return <LoadingPage />
    }
    const username = localStorage.getItem('username');
    const { product } = this.props;

    return (
      <div className="profile-wrapper">
        <div className="profile">
          <div className="profile-options-left">
            <div className="profile-options-title">
              <h2>{product.title}</h2>
              <p>For contact information see info section right</p>
            </div>

            <div className="profile-options-content">
              <div className="profile-options-content-product">
                <div className="profile-options-content-left">
                  <div className="profile-options-content-product-image">
                    <img src={product.image}></img>
                  </div>
                  <div className="profile-options-content-info">
                    <div className="profile-options-content-info-title">{product.title}</div>
                    <div>{product.description}</div>
                  </div>
                </div>
                <div style={{textAlign: 'right'}} className="profile-options-content-right">
                  <div>{numeral(product.price).format('$0,0')}</div>
                  <div>{moment(product.createdAt).format('lll')}</div>
                  <div>rating {product.averageRating}</div>
                  <div>{product.category.name}</div>

                </div>
              </div>

            </div>

          </div>

          <div className="profile-right">
            <div className="profile-settings-container">
               <NavLink activeClassName="profile-menu-active" className="profile-settings" to={`/user/${product.owner.username}`}>Go see user's profile</NavLink>
            </div>
            <div className="profile-settings-container">
              <div className="profile-settings-container-stats">
                <h3>Info</h3>
                <p>{
                    <span><i className="fas fa-user"></i> {product.owner.username} </span>
                   }
                </p>
                <p>{
                    <span><i className="fas fa-envelope"></i> {product.owner.email} </span>
                   }
                </p>
                <p>{
                    <span><i className="fas fa-sm fa-map-marker-alt"></i> {product.owner.address.city}, {product.owner.address.country} </span>
                   }
                </p>
                <p>{
                    <span><i className="fas fa-calendar-alt"></i> {moment(product.createdAt).format('lll')} </span>
                   }
                </p>
                <Link to={`/user/${product.owner.username}/products`}><i className="fas fa-list-ol"></i> See all products</Link>
              </div>
            </div>

            <div className="profile-settings-container">
              <h3>Product Link</h3>
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

export default connect(null, actions)(ProductPage);
