import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './Contact-data';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = (
      <div>
        <CheckoutSummary 
        ingredients={this.props.ingredientsRedux}
        checkoutCancelled={ this.checkoutCancelledHandler }
        checkoutContinued={ this.checkoutContinuedHandler } />
        <Route 
          path={this.props.match.path + '/contact-data'} 
          render={() => <ContactData ingredients={this.props.ingredientsRedux} price={this.props.totalPriceRedux} />} />
      </div>)
    if (this.props.purchaseDone || this.props.totalPriceRedux ===  4 ) {
      summary = <Redirect to='/' />
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredientsRedux: state.ingrs.ingredients,
    totalPriceRedux: state.ingrs.totalPrice,
    purchaseDone: state.ordrs.purchased
  }
}


export default connect(mapStateToProps)(Checkout);
