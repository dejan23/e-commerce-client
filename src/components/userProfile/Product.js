import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/product';
import ProductPage from './ProductPage';
import NotFoundPage from '../NotFoundPage';
import LoadingPage from '../LoadingPage';

class Product extends React.Component {
  componentWillMount() {
     this.props.startSetUserProduct(this.props.match.params.id)
  }

  renderComponent() {
    if(this.props.match.url === `/${this.props.product._id}`) {
      return (
        <ProductPage {...this.props} />
      )
    }
  }

  render() {
    if(this.props.loading) {
      return <LoadingPage />
    }
    return(
      <div>
        {
          this.props.product ?
          this.renderComponent() :
          <NotFoundPage />

        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  product: state.product.product,
  loading: state.product.productsIsLoading
})

export default connect(mapStateToProps, actions)(Product)
