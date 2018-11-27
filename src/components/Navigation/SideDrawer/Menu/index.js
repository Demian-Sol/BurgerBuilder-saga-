import React from 'react';

import Styles from './Menu.module.css';

const menu = (props) => (
  <div onClick={props.clicked} className={Styles.Menu}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default menu;
