import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import DashboardPage from '../components/DashboardPage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Logout from '../components/Logout';
import Register from '../components/Register';
import Profile from '../components/userProfile/Profile';
import ProfileEdit from '../components/userProfile/ProfileEdit';
import ProfileOptions from '../components/userProfile/ProfileOptions';
import ShowAllProducts from '../components/userProfile/ShowAllProducts';
import Product from '../components/userProfile/Product';

import NotFoundPage from '../components/NotFoundPage';


export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path='/' component={DashboardPage}/>
          <PublicRoute exact path='/register' component={Register}/>
          <PublicRoute exact path='/login' component={Login}/>
          <PublicRoute exact path='/logout' component={Logout}/>
          <PrivateRoute exact path='/user/edit-profile' component={ProfileEdit}/>
          <PrivateRoute exact path='/user/edit-account' component={ProfileEdit}/>
          <PrivateRoute exact path='/user/edit-picture' component={ProfileEdit}/>
          <PrivateRoute exact path='/user/my-orders' component={ProfileOptions}/>
          <PrivateRoute exact path='/user/my-products' component={ProfileOptions}/>
          <PrivateRoute exact path='/user/add-product' component={ProfileOptions}/>
          <PublicRoute exact path='/user/:id' component={Profile}/>
          <PublicRoute exact path='/user/:id/products' component={ShowAllProducts}/>
          <PublicRoute exact path='/:id' component={Product}/>
          <PrivateRoute exact path='/product/edit-product' component={ProfileOptions}/>
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
  </Router>
)

export default AppRouter;
