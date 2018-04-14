import React from 'react';
import { connect } from 'react-redux';
import BigPics from './BigPics';
import Stats from './Stats';
import Ads from './Ads';

class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <BigPics />
        <Stats />
        <Ads />
      </div>
    )
  }
}

export default connect(null, null)(DashboardPage)
