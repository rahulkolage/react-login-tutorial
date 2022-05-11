import React, { useRef, useImperativeHandle } from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  //   // by using useEffect we can set focus on input
  //   useEffect(() => {
  //     // foucs is DOM object method
  //     inputRef.current.focus();
  //   }, []);

  // but instead of using useEffect, we use our own method

  const activate = () => {
    inputRef.current.focus();
  }

  // second parameter is function which should return object
  // passed parameter "ref" is 2nd parameter of component function
  // only set when ref is passed from outside component
  // in here, we are passing Ref from outside where custom <Input> component called
  useImperativeHandle(ref, () => {
      return {
        focus: activate
      }
  })

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
