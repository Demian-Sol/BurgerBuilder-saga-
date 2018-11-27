import React from 'react';

import Styles from './BuildControls.module.css';
import BuildControl from './BuildControl';

const buildControls = (props) => {
  const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Meat', type: 'meat'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Bacon', type: 'bacon'}].map( (control) => {
    return <BuildControl 
    key={control.label} 
    label={control.label} 
    plusOne={() => props.plusOne(control.type)}
    minusOne={() => props.minusOne(control.type)}
    isDisabled={props.disabledInfo[control.type]} />
  });
  let buttonText = 'Sign Up';
  if (props.isLoggedIn) {
    buttonText = 'Make Order';
  }
  return( 
    <div className={Styles.BuildControls}>
      <p>Order price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls}
      <button 
        onClick={props.toCheckout} 
        className={Styles.OrderButton} 
        disabled={props.isForbidden}>
          {buttonText}
      </button>
    </div>);
}

export default buildControls;
