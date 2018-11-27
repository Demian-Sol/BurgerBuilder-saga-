import React from 'react';

import Styles from './Toolbar.module.css';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import Menu from '../SideDrawer/Menu';

const toolbar = (props) => (
  <header className={Styles.Toolbar}>
    <Menu clicked={props.openSideDrawer} />
    <div className={Styles.Logo}>
      <Logo />
    </div>
    <nav className={Styles.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuthenticated} />
    </nav>
  </header>
);

export default toolbar;