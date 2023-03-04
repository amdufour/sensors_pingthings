import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [hadFocus, setHadFocus] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = event => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = event => {
    setIsTouched(true);
  };

  const valueFocusHandler = event => {
    setHadFocus(true);
    setEnteredValue(event.target.value);
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    hadFocus,
    valueChangeHandler,
    valueBlurHandler,
    valueFocusHandler,
  };
};

export default useInput;