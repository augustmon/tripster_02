import React from "react";
import { useState } from "react";
import "./../../App.css";
import Button from "../Button/Button";
import "./LogInForm.css";
import Parse from "parse";

import { useNavigate } from "react-router-dom";

export default function LogInForm() {
  const [username, setUsername] = useState("gandalf");
  const [password, setPassword] = useState("gandalf");

  const navigate = useNavigate();

  function handleInputChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      const userLoggingIn = await Parse.User.logIn(username, password);
      if (userLoggingIn !== undefined) {
        console.log("User:", userLoggingIn.get("username"));
        navigate("/discover");
      } else {
        alert("Please input username and password! :P ");
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="log-in-form">
      <form onSubmit={handleFormSubmit}>
        {/*Username*/}
        <div className="form-item">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>

        {/*Password*/}
        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="centering">
          <div className="log-in-button">
            <Button onClick={handleFormSubmit} text="Log in" colors="login" />
          </div>
        </div>
      </form>
    </div>
  );
}
