import React from "react";
import SignupForm from "./../../components/Forms/SignUpForm";
import "./Signup.css";
import "./../../App.css";
import "./../../components/Greeting/Greeting";
import BackArrow from "../../components/BackArrow/BackArrow";

export default function Signup() {
  return (
    <div>
      <header>
        <BackArrow to="/" />

        <div className="title">
          <div className="greeting-tag">Welcome to Tripster!</div>
        </div>

        <div className="headline">
          <div className="greeting-headline">Sign Up</div>
        </div>
      </header>
      <body>
        <div className="centering">
          <SignupForm />
        </div>
      </body>
    </div>
  );
}
