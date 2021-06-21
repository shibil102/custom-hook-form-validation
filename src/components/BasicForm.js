import useInput from "../hooks/use-input";

const BasicForm = () => {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const {
    value: enteredFirstName,
    hasError: firstNameInputHasError,
    enteredValueHandler: enteredFirstNameChangeHandler,
    onBlurValueHandler: firstNameBlurHandler,
    ValueIsValid: enteredFirstNameIsValid,
    reset: resetFirstName,
  } = useInput((value) => value.trim() !== "" && value.length >= 3);

  const {
    value: enteredSecondName,
    hasError: secondNameInputHasError,
    enteredValueHandler: enteredSecondNameChangeHandler,
    onBlurValueHandler: secondNameBlurHandler,
    ValueIsValid: enteredSecondNameIsValid,
    reset: resetSecondName,
  } = useInput(
    (value) =>
      value.trim() !== "" && value.length >= 3 && value !== enteredFirstName
  );

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    enteredValueHandler: enteredEmailChangeHandler,
    onBlurValueHandler: emailBlurHandler,
    ValueIsValid: enteredEmailIsValid,
    reset: resetEmail,
  } = useInput((value) => regEx.test(value));

  let form = false;

  if (
    enteredFirstNameIsValid &&
    enteredSecondNameIsValid &&
    enteredEmailIsValid
  ) {
    form = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !enteredFirstNameIsValid ||
      !enteredSecondNameIsValid ||
      !enteredEmailIsValid
    ) {
      return;
    }
    console.log(enteredFirstName);
    console.log(enteredSecondName);
    console.log(enteredEmail);
    resetFirstName();
    resetSecondName();
    resetEmail();
  };

  const firstNameClasses = firstNameInputHasError
    ? "form-control invalid"
    : "form-control";
  const secondNameClasses = secondNameInputHasError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={enteredFirstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={enteredFirstName}
          />
          {firstNameInputHasError && (
            <small className="error-text">name is not valid</small>
          )}
        </div>
        <div className={secondNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onBlur={secondNameBlurHandler}
            onChange={enteredSecondNameChangeHandler}
            value={enteredSecondName}
          />
          {secondNameInputHasError && (
            <small className="error-text">name is not valid</small>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={enteredEmail}
          onChange={enteredEmailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
          <small className="error-text">email is not valid</small>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!form}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
