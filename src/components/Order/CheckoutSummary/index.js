import React from 'react';

import Styles from './CheckoutSummary.module.css';
import Burger from '../../Burger';
import Button from '../../UI/Button';

const checkoutSummary = (props) => {
  return (
    <div className={Styles.CheckoutSummary}>
      <h1>We hope you will enjoy our burger!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType='Danger' clicked={props.checkoutCancelled}>Back</Button>
      <Button btnType='Success' clicked={props.checkoutContinued}>Continue</Button>
    </div>
  );
}

export default checkoutSummary;
