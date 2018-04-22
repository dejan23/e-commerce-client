import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/category';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

class Ads1 extends React.Component {
  render() {
    return (
      <Link to={`/${this.props._id}`} className="a-group-item">
        <div className="profile-options-content-product-image"><img src={this.props.image}></img></div>
        <div>{this.props.title}</div>
        <div>
          <div className="profile-options-content-info-description">{this.props.description}</div>
          <div>{numeral(this.props.price).format('$0,0')}</div>
          <div>{moment(this.props.createdAt).format('lll')}</div>
          <div>by {this.props.owner.username}</div>
        </div>
      </Link>
    )
  }
}

const mapStateToProps = (state) => ({

})

export default connect(null, actions)(Ads1)
