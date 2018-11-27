import React from 'react';

import Styles from './userOrder.module.css';

const userOrder = (props) => {
  let ingrsInline = [];
  for (let key in props.ingredients) {
    ingrsInline.push(`${key} (${props.ingredients[key]})`);
  }
  return(
    <div className={Styles.UserOrder}>
      <p>Ingredients: {ingrsInline.join(', ')}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>

    </div>
  );
}

export default userOrder;