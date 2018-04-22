import React from 'react';
import { connect } from 'react-redux';
import { startSetUsersCount } from '../actions/user';
import { startSetProductsCount } from '../actions/product';


class DashboardPage extends React.Component {
  componentWillMount() {
    this.props.startSetUsersCount()
    this.props.startSetProductsCount()
  }

  render() {
    return (
      <div className="stats">
        <div className="stats-wrapper">
          <div className="stats-content">
            <div className="stats-item">
              <div className="stats-item-icon"><i className="fa fa-3x fa-users"></i></div>
              <div>
                <h2>Users</h2>
                Total: {
                    !this.props.usersCount ?
                    <span>0</span> :
                    <span>{this.props.usersCount}</span>
                  }
                <br />
                This month: <i style={{opacity: '0.5'}}>0</i>
                <br />
                <i style={{opacity: '0.5'}}>see all</i>
              </div>
            </div>

            <div className="stats-item">
              <div className="stats-item-icon"><i className="fas fa-3x fa-clipboard-list"></i></div>
              <div>
                <h2>Products</h2>
                Total: {
                    !this.props.productsCount ?
                    <span>0</span> :
                    <span>{this.props.productsCount}</span>
                  }
                <br />
                This month: <i style={{opacity: '0.5'}}>0</i>
                <br />
                <i style={{opacity: '0.5'}}>see all</i>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  usersCount: state.user.count,
  productsCount: state.product.count
})

export default connect(mapStateToProps, { startSetUsersCount, startSetProductsCount })(DashboardPage)
