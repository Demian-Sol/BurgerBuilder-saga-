import React from 'react';

import Styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem';

const navigationItems = (props) => (
  <ul className={Styles.NavigationItems}>
    <NavigationItem link='/' dropBack={props.dropBack}>BurgerBuilder </NavigationItem>
    {props.isAuthenticated &&
      <NavigationItem link='/orders' dropBack={props.dropBack}>Orders</NavigationItem>
    }
    {props.isAuthenticated 
      ? <NavigationItem link='/logout' dropBack={props.dropBack}>Logout</NavigationItem>
      : <NavigationItem link='/auth' dropBack={props.dropBack}>Authenticate</NavigationItem>}
  </ul>
);

export default navigationItems;