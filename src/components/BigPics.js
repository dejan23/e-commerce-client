import React from 'react';
import { connect } from 'react-redux';


class DashboardPage extends React.Component {
  render() {
    return (
      <div className="bigpics">
        <div className="bigpics-wrapper">
          <div className="bigpics-content">
            <h1>Welcome</h1>
            <p>You can search everything from a to z</p>
            <input type="text" placeholder="What do you want to search?" />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(DashboardPage)
