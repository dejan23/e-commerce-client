import React from 'react';
import { connect } from 'react-redux';


class DashboardPage extends React.Component {
  render() {
    return (
      <div className="stats">
        <div className="stats-wrapper">
          <div className="stats-content">
            <div className="stats-item">
              <div className="stats-item-icon"><i className="fa fa-3x fa-users"></i></div>
              <div>
                <h2>Users</h2>
                Total: 13
                <br />
                This month: 1
              </div>
            </div>

            <div className="stats-item">
              <div className="stats-item-icon"><i className="fas fa-3x fa-clipboard-list"></i></div>
              <div>
                <h2>Products</h2>
                Total: 13
                <br />
                This month: 1
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(DashboardPage)
