import * as actionTypes from './actionTypes';


export const addIngr = (ingr) => {
  return {
    type: actionTypes.ADD_INGR,
    ingrToAdd: ingr
  }
}

export const removeIngr = (ingr) => {
  return {
    type: actionTypes.REMOVE_INGR,
    ingrToRemove: ingr
  }
}

export const fillIngredients = (ingrsToPlace) => {
  return {
    type: actionTypes.FILL_INGRS,
    ingrsInitial: ingrsToPlace
  }
};

export const ingrsLoadingFailed = () => {
  return {
    type: actionTypes.INGRS_LOADING_FAILED
  }
}

export const ingredientsInit = () => {
  return {
    type: actionTypes.GET_INGREDIENTS
  };
};