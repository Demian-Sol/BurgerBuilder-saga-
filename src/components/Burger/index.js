import React from 'react';

import BurgerIngredient from './BurgerIngredient';
import Styles from './Burger.module.css';

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients);
  let staffing = transformedIngredients.map( (ingr) => {
    return [...Array(props.ingredients[ingr])].map( (_, i) => {
      return <BurgerIngredient key={ingr + i} type={ingr} />;
    });      
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, []) ;
  if (staffing.length === 0) {
    staffing = <p>Please start adding ingredients</p>
  }
  return (
    <div className={Styles.Burger}>
      <BurgerIngredient type='bread-top' />
      {staffing}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
}

export default burger;