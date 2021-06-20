import useInput from "../hooks/use-input"; //must use use behind the custom hooks while using, just like normal hooks

const SimpleInput = () => {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    value: enteredName,
    hasError: nameInputHasError,
    enteredValueHandler: enteredNameChangeHandler,
    onBlurValueHandler: nameBlurHandler,
    ValueIsValid: enteredNameIsValid,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    enteredValueHandler: enteredEmailChangeHandler,
    onBlurValueHandler: emailBlurHandler,
    ValueIsValid: enteredEmailIsValid,
    reset: resetEmail,
  } = useInput((value) => regEx.test(value));

  console.log(enteredEmailIsValid);

  let form = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    form = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredEmail);
    console.log(enteredName);
    resetName();
    resetEmail();
  };

  const classes = nameInputHasError ? "form-control invalid" : "form-control";
  const classnames = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={enteredNameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && (
          <small className="error-text">This is invalid</small>
        )}
      </div>
      <div className={classnames}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          value={enteredEmail}
          onChange={enteredEmailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
          <small className="error-text">This email is invalid</small>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!form}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
