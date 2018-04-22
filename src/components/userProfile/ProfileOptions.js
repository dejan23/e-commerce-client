import React from 'react';
import { connect } from 'react-redux';
import MyOrders from './MyOrders';
import MyProducts from './MyProducts';
import AddProduct from './AddProduct';
import ProductEdit from './ProductEdit';
import { startSetUserProfile } from '../../actions/user'
import NotFoundPage from '../NotFoundPage';
import LoadingPage from '../LoadingPage';

export class ProfileEdit extends React.Component {
  componentWillMount() {
    this.props.startSetUserProfile()
  }

  renderComponent() {
    if(this.props.match.url === "/user/my-orders") {
      return (
        <MyOrders {...this.props} />
      )
    }

    if(this.props.match.url === "/user/my-products") {
      return (
        <MyProducts {...this.props} />
      )
    }

    if(this.props.match.url === "/user/add-product") {
      return (
        <AddProduct {...this.props} />
      )
    }

    if(this.props.match.url === "/product/edit-product") {
      return (
        <ProductEdit {...this.props} />
      )
    }
  }


  render() {
    if(this.props.loading) {
      return <LoadingPage />
    }
    return (
      <div>
          {
            this.props.user ?
            this.renderComponent() :
            <NotFoundPage />
          }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user: state.user.user,
  loading: state.user.userIsLoading
})

export default connect(mapStateToProps, { startSetUserProfile })(ProfileEdit)
