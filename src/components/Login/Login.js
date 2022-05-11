import React, { useState, useEffect, useReducer, useContext,
useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

// this fn. is defined outside scope of compo. fn.
// as it doesn't need to interact with anything defined inside component fn.
// or inside emailReducer function we don't need any data that is
// generated inside component function
const emailReducer = (state, action) => {
  // return new state
  // remember we are combining 2 states one is email value and another is email validituy

  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    // using last state snapshot as for BLUR type we haven't passed any value
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

// password reducer fn
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
};

const Login = (props) => {

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  // using useReducer() for email
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null, // false
  });

  // using useReducer() for password
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null, // false
  });

  const authCtx = useContext(AuthContext);

  // create email and password ref and forward them from input component
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // ----------------------------

  // ----------------------------
  // useEffect(() => {
  //   console.log('Effect running');
  // }, [enteredPassword]);


  // object destructuring
  // use effect will run on every input chanage 
  // case is like, if email is valid and valid password entered , and add one character to password 
  // useEffect will run for whole state, but we are interested in only validity
  // optimize useEffect
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // will useEffect to have one place where we mark form as valid / invalid
  // on change of  email and password we set Form valid/invalid based on entered value
  useEffect(()=>{

    // debouncing setFormIsValid
    const identifier = setTimeout(() => {
      console.log('Effect - Checking for validity');
      setFormIsValid(
        // enteredEmail.includes('@') && enteredPassword.trim().length > 6
        // emailState.isValid && passwordState.isValid

        emailIsValid && passwordIsValid // useEffect will not rerun after both are valid // optimize useEffect
      );
      // this is better way for updating STATE based on other STATES
    }, 500);

    // Clean up function
    return () => {
      console.log('CLEATNUP');
      clearTimeout(identifier);
    };
    // setFormIsValid(
    //   enteredEmail.includes('@') && enteredPassword.trim().length > 6
    // );
  },[emailIsValid, passwordIsValid]);
    // [emailState, passwordState]
   //[enteredEmail, enteredPassword]
  // ----------------------------

  const emailChangeHandler = (event) => {
    // for useReducer, we pass action to dispatchEmail
    // this is state updating fn
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
    // for useReducer complete...

    // setEnteredEmail(event.target.value);

    // moving this function in useEffect
    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // for useReducer()
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
    // for useReducer complete...

    // setEnteredPassword(event.target.value);

    // // moving this function in useEffect
    // setFormIsValid(
    //   enteredEmail.includes('@') && event.target.value.trim().length > 6
    // );  // here we are violating function form exection by depending on other states instead same state


  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    // we can't use function form here as function form of state updating fun. we only get Latest state for that state which setting here

    // instead emailState.value.includes('@') we can have isValid
    // setEmailIsValid(emailState.isValid);

    // for useReducer() , dispatch action
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    // for useReducer(),
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);

    // props.onLogin(emailState.value, passwordState.value);
    // using context
    // authCtx.onLogin(emailState.value, passwordState.value);

    if(formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      // calling activate method from Input component
      // to make it work we have to use Hook useImperativeHandle() in input.js
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* <div
          className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ''
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            // value={enteredEmail}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}

        {/* we put ref on input html element to focus , check input js */}
        <Input 
          ref={emailInputRef}
          id="email" 
          label="E-Mail" 
          type="email" 
          isValid={emailIsValid} 
          value={emailState.value} 
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler} />

        <Input
          ref={passwordInputRef}
          id="password" 
          label="Password" 
          type="password" 
          isValid={passwordIsValid} 
          value={passwordState.value} 
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler} />

        {/* <div
          className={`${classes.control} ${
            // passwordIsValid === false ? classes.invalid : ''
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            // value={enteredPassword}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
          {/* <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button> */}
        </div>
      </form>
    </Card>
  );
};

export default Login;
