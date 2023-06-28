import React from "react";
import "./Button.css";

export default function Button(props) {
  return (
    <button className="Button" id={props.colors} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
