import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} ) ).toEqual({
      token: '',
      userId: '',
      error: null,
      loading: false
    });

  })
  it('shoul store thhe token upon login', () => {
    expect(reducer({
      token: '',
      userId: '',
      error: null,
      loading: false
    }, {type: actionTypes.AUTH_SUCCESS, idToken: '123', userId: 'user'})).toEqual({
      token: '123',
      userId: 'user',
      error: null,
      loading: false
    })
  })
})