import React, { Component } from 'react';

import Layout from './containers/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Logout from './containers/Auth/Logout';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent';

const AsyncAuth = asyncComponent( () => {
    return import('./containers/Auth');
})

const AsyncCheckout = asyncComponent( () => {
    return import('./containers/Checkout');
})

const AsyncUserOrders = asyncComponent( () => {
    return import('./containers/UserOrders');
})


class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/b-builder' component={BurgerBuilder} />
        <Route path='/auth' component={AsyncAuth} />
        <Redirect to='/b-builder' />
      </Switch>
    );
    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path='/orders' exact component={AsyncUserOrders} />
          <Route path='/b-builder' component={BurgerBuilder} />
          <Route path='/auth' component={AsyncAuth} />
          <Route path='/checkout' component={AsyncCheckout} />
          <Route path='/logout' component={Logout} />
          <Redirect to='/b-builder' />
        </Switch>
      );
    }
    return (
      <BrowserRouter>
        <div>
        	<Layout>
            {routes}  
        	</Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== ''
  }
}

export default connect(mapStateToProps)( App);
