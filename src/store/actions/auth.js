import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: authData.idToken,
    userId: authData.localId
  };
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
}

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
}

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
}

export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER_SAGA,
    email: email,
    password: password,
    isSignup: isSignup
  };
}

export const authCheckState = () => {
  return {
    type: actionTypes.AUTO_SIGN_IN
  };
}