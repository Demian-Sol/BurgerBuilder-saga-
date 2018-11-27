import React from 'react';

import Styles from './Backdrop.module.css';

const backdrop = (props) => {
  if (props.show) {
    return <div className={Styles.Backdrop} onClick={props.dropBack}></div>
  } else {return null}
}

export default backdrop;