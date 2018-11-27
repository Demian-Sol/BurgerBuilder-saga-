import React, { Component } from 'react';

import UserOrder from '../../components/UserOrder';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner';
import { fetchOrders } from '../../store/actions';

class UserOrders extends Component {
  
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
    
  }

  render() {
    let orders = (
      <div>
        {this.props.orders.map( order => {
          return <UserOrder ingredients={order.ingredients} price={order.price} key={order.id} />
        })}
      </div>)
    if (this.props.loading) {
      orders = <Spinner />
    }  
    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.ordrs.orders,
    loading: state.ordrs.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch( fetchOrders(token, userId) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(UserOrders, axios) );
