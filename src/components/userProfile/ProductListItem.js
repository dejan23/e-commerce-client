import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
moment.locale();
import numeral from 'numeral';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';



class ProductListItem extends React.Component {
  deleteProduct = () => {
    this.props.startDeleteProduct(this.props._id)
  };

  renderProduct () {
    const { props } = this;
    if(props.url === "/user/my-products") {
      return (
        <div className="profile-options-content-product">
          <div className="profile-options-content-left">
            <div className="profile-options-content-product-image">
              <img src={props.image}></img>
            </div>
            <div className="profile-options-content-info">
              <div className="profile-options-content-info-title">{props.title}</div>
              <div className="profile-options-content-info-description">{props.description}</div>
              <div>{numeral(props.price).format('$0,0')}</div>
              <div>posted: {moment(props.createdAt).format('lll')}</div>
              <div>rating: {props.averageRating}</div>
              <div>category: {props.category.name}</div>
            </div>
          </div>
          <div className="profile-options-content-right">
            <Link to={`/${props._id}`} className="profile-link-button">View more details</Link>
            <Link to={{
              pathname: '/product/edit-product',
              state: {
                id: props._id,
                title: props.title,
                description: props.description,
                price: props.price,
                categoryId: props.category._id,
                product_picture: props.image,
                owner: props.owner._id
              }
            }}  className="profile-link-button">Edit product</Link>
            <button className="profile-link-button" type="button" onClick={this.deleteProduct}>Delete product</button>
          </div>
        </div>
      )
    } else {
      return (
        <Link to={`/${props._id}`} className="profile-options-content-product-link">
          <div className="profile-options-content-left">
            <div className="profile-options-content-product-image">
              <img src={props.image}></img>
            </div>
            <div className="profile-options-content-info">
              <div className="profile-options-content-info-title">{props.title}</div>
              <div className="profile-options-content-info-description">{props.description}</div>
              <div>{numeral(props.price).format('$0,0')}</div>
              <div>posted: {moment(props.createdAt).format('lll')}</div>
              <div>rating: {props.averageRating}</div>
              <div>category: {props.category.name}</div>
            </div>
        </div>
      </Link>
      )
    }
  }


  render() {
    const { props } = this;
    return (
      this.renderProduct()
    )
  }
}

export default connect(null, actions)(ProductListItem);
