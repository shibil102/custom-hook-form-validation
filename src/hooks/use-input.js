import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredValueTouched, setEnteredValueTouched] = useState(false);

  const ValueIsValid = validateValue(enteredValue);
  const hasError = enteredValueTouched && !ValueIsValid;

  const onBlurValueHandler = () => {
    setEnteredValueTouched(true);
  };

  const enteredValueHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const reset = () => {
    setEnteredValueTouched(false);
    setEnteredValue("");
  };

  return {
    reset,
    value: enteredValue,
    ValueIsValid,
    hasError,
    onBlurValueHandler,
    enteredValueHandler,
  };
};

export default useInput;
