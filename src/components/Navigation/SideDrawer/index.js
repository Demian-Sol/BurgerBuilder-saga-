import React from 'react';

import Styles from './SideDrawer.module.css';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import BackDrop from '../../UI/Backdrop';

const sideDrawer = (props) => {
  const styling = props.isShown 
    ? `${Styles.SideDrawer} ${Styles.Open}` 
    : `${Styles.SideDrawer} ${Styles.Close}`;
  return(
    <>
      <div className={styling}>
        <div className={Styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems 
            isAuthenticated={props.isAuthenticated} 
            dropBack={props.closeSideDrawer} />
        </nav>
      </div>
      <BackDrop show={props.isShown} dropBack={props.closeSideDrawer} />
    </>
  );
};

export default sideDrawer;