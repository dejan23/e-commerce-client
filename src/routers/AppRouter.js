import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Register from '../components/Register';

import NotFoundPage from '../components/NotFoundPage';


export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path='/' component={DashboardPage}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={Login}/>
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
  </Router>
)

export default AppRouter;
