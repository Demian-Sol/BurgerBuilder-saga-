export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== ''
  };
  if (rules.minLength && isValid) {
    isValid = value.length >= rules.minLength;
  };

  return isValid
}