import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, authTimeoutSaga, authUserSaga, autoSignInSaga } from './auth';
import { getIngredientsSaga } from './burgerBuilder';
import { makeBurgerPurchaseSaga, getOrdersSaga } from './order';

export function* watchForSagas() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER_SAGA, authUserSaga),
    takeEvery(actionTypes.AUTO_SIGN_IN, autoSignInSaga),
    takeEvery(actionTypes.GET_INGREDIENTS, getIngredientsSaga),
    takeLatest(actionTypes.MAKE_BURGER_PURCHASE, makeBurgerPurchaseSaga),
    takeLatest(actionTypes.GET_ORDERS, getOrdersSaga)
  ]);
}
