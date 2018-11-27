import React, { Component } from 'react';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/';
import { purchaseInit } from '../../store/actions'



export class BurgerBuilder extends Component {
  state = {
    isModalHidden: true,
  }

  componentDidMount() {
   this.props.onInitPurchase();
   this.props.onInitialiseIngredients() 
  }

  PurchaseHandler = () => {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/auth');
    }
    if (this.state.isModalHidden === true) {
      this.setState({isModalHidden: false});
    }
  }

  PurchaseCancelHandler = () => {
    if (this.state.isModalHidden === false) {
      this.setState({isModalHidden: true});
    }
  }

  PurchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  } 

  updatePurchasableState = () => {
    let sum = 0;
    const ingrs = {
      ...this.props.ingredientsRedux
    }
    for (let key in ingrs) {
      sum += ingrs[key];
    }
    return sum > 0;
  }

	render () {
    const disabledInfo = {
      ...this.props.ingredientsRedux
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = <OrderSummary 
          moveOn={this.PurchaseContinueHandler} 
          dropBack={this.PurchaseCancelHandler} 
          ingredients={this.props.ingredientsRedux} 
          price={this.props.totalPriceRedux.toFixed(2)} />;
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    let burger = <Burger ingredients={this.props.ingredientsRedux}/>;
    if (this.props.errorOccured) {
      burger = <p style={{textAlign: 'center'}}>Ingredients cannot be loaded</p>
    }
		return( 
      <>
        <Modal isHidden={this.state.isModalHidden} dropBack={this.PurchaseCancelHandler}>
          {orderSummary}
        </Modal>     
        {burger}
        {!this.props.errorOccured &&
          <BuildControls 
            plusOne={this.props.onAddIngr} 
            minusOne={this.props.onRemoveIngr} 
            disabledInfo={disabledInfo} 
            price={this.props.totalPriceRedux}
            isForbidden={!this.updatePurchasableState()} 
            toCheckout={this.PurchaseHandler}
            isLoggedIn={this.props.isAuthenticated}/>
        }
			</>);
	}
}

const mapStateToProps = state => {
  return {
    ingredientsRedux: state.ingrs.ingredients,
    totalPriceRedux: state.ingrs.totalPrice,
    errorOccured: state.ingrs.ingrsLoadingFailed,
    isAuthenticated: state.auth.token !== ''
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngr: (ingr) => dispatch( burgerBuilderActions.addIngr(ingr) ),
    onRemoveIngr: (ingr) => dispatch( burgerBuilderActions.removeIngr(ingr) ),
    onInitialiseIngredients: () => dispatch(burgerBuilderActions.ingredientsInit() ),
    onInitPurchase: () => dispatch( purchaseInit() )

  }
}

export default withErrorHandler( connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axios );