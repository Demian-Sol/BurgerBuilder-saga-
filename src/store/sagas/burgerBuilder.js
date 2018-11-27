import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios-orders';

export function* getIngredientsSaga(action) {
  try {
    const response = yield axios.get('/ingredients.json');
    yield put( actions.fillIngredients(response.data) );
  } catch(error) {
    yield put( actions.ingrsLoadingFailed() );
  }
}