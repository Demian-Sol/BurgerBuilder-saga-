import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/Utility';

const initialState = {
  token: '',
  userId: '',
  error: null,
  loading: false
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  })
}

const authFail = (state, action) => {
  return updateObject(state, {error: action.error.response.data.error.message, loading: false})
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return updateObject(state, {error: null, loading: true});
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return updateObject(state, {token: '', userId: ''} );
    default: return state;
  }
}

export default authReducer;