import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from '../actions';
import axios from 'axios';

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'idToken');
  yield call([localStorage, 'removeItem'], 'localId');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield put( actions.logoutSucceed() );
}

export function* authTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put( actions.logout() ); 
}

export function* authUserSaga(action) {
  yield put( actions.authStart() );
    const authData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true
    }
    let URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBWGjfeH5q_Y4_2OW28wJ0uZgK4vyrIaMA';
    if (!action.isSignup) {
      URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBWGjfeH5q_Y4_2OW28wJ0uZgK4vyrIaMA';
    }
    try {
      const response = yield axios.post(URL, authData )
      yield localStorage.setItem('idToken', response.data.idToken);
      yield localStorage.setItem('localId', response.data.localId);
      yield localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000));
      yield put( actions.authSuccess(response.data) );
      yield put( actions.checkAuthTimeout(response.data.expiresIn) );
    } catch(error) {
      yield console.log(error);
      yield put( actions.authFail(error) );
    }
}

export function* autoSignInSaga(action) {
  const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date() ) {
      yield put( actions.logout() );
    } else {
      const idTokenLS = localStorage.getItem('idToken');
      const localIdLS = localStorage.getItem('localId');
      const mSecondsRemained = Math.round((new Date(expirationDate).getTime() - new Date().getTime()) / 1000 );
      // console.log(mSecondsRemained);
      yield put( actions.checkAuthTimeout(mSecondsRemained) );
      yield put( actions.authSuccess( {idToken: idTokenLS, localId: localIdLS} ) );
    }
}