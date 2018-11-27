import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios-orders';

export function* makeBurgerPurchaseSaga(action) {
  yield put( actions.purchaseBurgerStart() );
  try {
    const response = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
    yield put( actions.purchaseBurgerSuccess(response.data.name, action.orderData) );
  } catch(error) {
    yield put( actions.purchaseBurgerFailure(error.message) );
  }
}

export function* getOrdersSaga(action) {
  yield put( actions.fetchOrdersStart() );
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
  try {
    const response = yield axios.get('/orders.json' + queryParams);
    yield put( actions.fetchOrdersSuccess(response.data) );
  } catch(error) {
    yield put( actions.fetchOrdersFailure(error.message) );
  }
}