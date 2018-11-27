import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/Utility';

const initialState = {
  loading: false,
  orders: [],
  purchased:false
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {id: action.orderId} );
  return {loading: false, purchased: true, orders: state.orders.concat(newOrder)}
}

const fetchOrdersSuccess = (state, action) => {
  let fetchedOrders = [];
  for (let key in action.orders) {
      fetchedOrders.push({
      ...action.orders[key],
      id:key
    })
  }
  return {loading: false, orders: fetchedOrders}
}

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:           return updateObject(state, {purchased: false} );      
    case actionTypes.PURCHASE_BURGER_START:   return updateObject(state, {loading: true} );      
    case actionTypes.PURCHASE_BURGER_SUCCESS: return updateObject(state, purchaseBurgerSuccess(state, action) ); 
    case actionTypes.PURCHASE_BURGER_FAILURE: return updateObject(state, {loading: false} );

    case actionTypes.FETCH_ORDERS_START:   return updateObject(state, {loading: true} );      
    case actionTypes.FETCH_ORDERS_SUCCESS: return updateObject(state, fetchOrdersSuccess(state, action) );
    case actionTypes.FETCH_ORDERS_FAILURE: return updateObject(state, {loading: false} );      
    default: return state;
  }
}

export default ordersReducer;