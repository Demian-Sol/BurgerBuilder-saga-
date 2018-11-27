import React from 'react';

import Styles from './BuildControl.module.css';

const buildControl = (props) => {
  return (
    <div className={Styles.BuildControl}>
      <div className={Styles.Label}>{props.label}</div>
      <button disabled={props.isDisabled} className={Styles.Less} onClick={props.minusOne}>Less</button>
      <button className={Styles.More} onClick={props.plusOne}>More</button>
    </div>);
};

export default buildControl;
