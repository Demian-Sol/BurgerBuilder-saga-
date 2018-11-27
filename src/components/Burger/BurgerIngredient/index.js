import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './BurgerIngredient.module.css';

class BurgerIngredient extends Component {
  render () {
    const ingredientsStyling = {
    'bread-bottom': Styles.BreadBottom,
    'bread-top':    Styles.BreadTop,
    'meat':         Styles.Meat,
    'cheese':       Styles.Cheese,
    'salad':        Styles.Salad,
    'bacon':        Styles.Bacon,
    }

    return (
      <div className={ingredientsStyling[this.props.type]}>
        {this.props.type === 'bread-top' &&
          <>
            <div className={Styles.Seeds1} />
            <div className={Styles.Seeds2} />
          </>
        }
      </div>
    );
  };
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;
