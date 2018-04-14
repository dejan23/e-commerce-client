import React from 'react';
import {connect} from 'react-redux';

class Logout extends React.Component {
  componentWillMount() {

  }

  render() {
    return (
      <div style={{marginTop: '20px', textAlign: 'center'}}>
        Sorry to see you go
      </div>
    );
  }
}

export default connect()(Logout);
