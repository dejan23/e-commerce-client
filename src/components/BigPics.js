import React from 'react';
import { connect } from 'react-redux';


class DashboardPage extends React.Component {
  render() {
    return (
      <div className="bigpics">
        <div className="bigpics-wrapper">
          <div className="bigpics-content">
            <div className="bigpics-content-left">
              <div>
                <h1>Welcome</h1>
                <p>You can search everything from a to z</p>
                <input disabled type="text" placeholder="What do you want to search?" />
              </div>
            </div>
            <div className="bigpics-content-right">
              <h2>What is done:</h2>
                <p><strong>Profile and products</strong></p>
                <p>- register, login, logout, reset password</p>
                <p>- profile page, profile settings</p>
                <p>- my orders component only, my products</p>
                <p>- add new products, edit products, fetch products</p>
                <p>- now you can upload image to the product</p>
                <p>- added flash messages</p>
                <p>- fetch single product by id</p>
                <p>- fetch all products</p>
                <p>- fetch all products by user</p>
                <p>- fetch all products by category</p>
                <p>- see profile page /user/johndoe</p>
                <p>- see all products from user /user/johndoe/products</p>
                <p>- api order with stripe is done, need to do client side</p>
                <p>- api search with algolio is done, need to do client side</p>

              <h2>To do:</h2>
                <p>- fetch and list products on here on homepage</p>
                <p>- upload multiple images, remove images and add new on edit</p>
                <p>- rating</p>
                <p>- product review</p>
                <p>- search</p>
                <p>- sort, filter, pagination</p>
                <p>- order with stripe on client side</p>
                <p>- messaging system</p>
                <p>- full responsive design</p>
                <p>- code splitting</p>
                <p>... will add more as i remember something new</p>

              <h3>done in node, mongo, react, redux</h3>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(DashboardPage)
