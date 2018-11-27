import * as actionTypes from '../actions/actionTypes';
import { INGREDIENT_PRICES } from '../ingredientPrices';
import { updateObject } from '../../shared/Utility';

const initialState = {
  ingredients: {},
  totalPrice: 4,
  ingrsLoadingFailed: false,
  building: false
}

const isIngredientsNull = (state) => {
    let sum = 0;
    const ingrs = {
      ...state.ingredients
    }
    for (let key in ingrs) {
      sum += ingrs[key];
    }
    // console.log(sum);
    return sum <= 0;
  }

const addIngr = (state, action) => {
  const updatedIngredientA = {[action.ingrToAdd]: state.ingredients[action.ingrToAdd] + 1}
  const updatedIngredientsA = updateObject(state.ingredients, updatedIngredientA );
  return {ingredients: updatedIngredientsA, totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingrToAdd], building: true }  
}

const removeIngr = (state, action) => {
  const updatedIngredientR = {[action.ingrToRemove]: state.ingredients[action.ingrToRemove] - 1}
  const updatedIngredientsR = updateObject(state.ingredients, updatedIngredientR );
  const updatedPrice = state.totalPrice - INGREDIENT_PRICES[action.ingrToRemove];
  let updatedState = {ingredients: updatedIngredientsR, totalPrice: updatedPrice }
  if ( isIngredientsNull(updatedState) ) {
    updatedState.building = false;
  }
  return updatedState;
}

const fillIngrs = (state, action) => {
  return { ingredients: action.ingrsInitial, totalPrice: 4, ingrsLoadingFailed: false, building: false }
}

const ingredientsReducer = (state = initialState, action) => {
  switch( action.type ) {
    case actionTypes.ADD_INGR:             return updateObject(state, addIngr(state, action) );
    case actionTypes.FILL_INGRS:           return updateObject(state, fillIngrs(state, action) );
    case actionTypes.REMOVE_INGR:          return updateObject(state, removeIngr(state, action) );
    case actionTypes.INGRS_LOADING_FAILED: return updateObject(state, {ingrsLoadingFailed: true} );
    default: break;
  }
  return state;
}

export default ingredientsReducer;
