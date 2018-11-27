import React, { Component } from 'react';

import CustomButton from '../../UI/Button';

class OrderSummary extends Component {
    //doesn't have to be a class
  render () {
    let ingredientsArray = [];
    for (let key in this.props.ingredients) {
      ingredientsArray.push(<li style={{textTransform: 'capitalize'}} key={key + 'ingredientsArray'}>{key}: {this.props.ingredients[key]}</li>);
    }
    return (
      <>
        <h3>Your order:</h3>
        <p>A yammy burger stuffed with:</p>
        <ul>
          {ingredientsArray}
        </ul>
        <p>Order price: <strong>{this.props.price}</strong></p>
        <p>Proceed to checkout?</p>
        <CustomButton clicked={this.props.dropBack} btnType='Danger'>CANCEL</CustomButton>
        <CustomButton clicked={this.props.moveOn} btnType='Success'>CONTINUE</CustomButton>
      </>
    );
  }
}

export default OrderSummary;