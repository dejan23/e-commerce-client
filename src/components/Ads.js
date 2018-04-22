import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/category';
import NotFoundPage from './NotFoundPage';
import LoadingPage from './LoadingPage';
import Ads1 from './Ads1';

class Ads extends React.Component {
  componentWillMount() {
    this.props.startProductsByCategory1('5acbd45a9bc1a31bf0ac3c4b')
    this.props.startProductsByCategory2('5ad88bb0b686942bc470445d')
    this.props.startProductsByCategory3('5ad88bc8b686942bc470445e')
  }

  renderComponent() {
    return (
      <div className="a-wrapper">
        <div className="a-group">
          <div className="a-group-title">
            <h2>category 1</h2>
          </div>
          <div className="a-group-content">
            {this.props.products1.map((product) => {
              return <Ads1 key={product._id} {...product} />
            })}
          </div>
        </div>
        <div className="a-group">
          <div className="a-group-title">
            <h2>category 2</h2>
          </div>
          <div className="a-group-content">
            {this.props.products2.map((product) => {
              return <Ads1 key={product._id} {...product} />
            })}
          </div>
        </div>
        <div className="a-group">
          <div className="a-group-title">
            <h2>category 3</h2>
          </div>
          <div className="a-group-content">
            {this.props.products3.map((product) => {
              return <Ads1 key={product._id} {...product} />
            })}
          </div>
        </div>
      </div>
    )
  }

  render() {
    if(this.props.loading) {
      return <LoadingPage />
    }
    return (
      <div className="a-wrapper">
        {
          this.props.products1 && this.props.products2 && this.props.products3  ?
          this.renderComponent() :
          <NotFoundPage />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products1: state.category.products1,
  products2: state.category.products2,
  products3: state.category.products3
})

export default connect(mapStateToProps, actions)(Ads)
