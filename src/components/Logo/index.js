import React from 'react';

import Styles from './Logo.module.css';
import burgerCatLogo from '../../assets/images/Burger-cat-logo.png';

const logo = (props) => (
  <div className={Styles.Logo}>
    <img src={burgerCatLogo} alt='SublimeBurger' />
  </div>
);

export default logo;