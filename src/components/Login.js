import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import auth from "../utils/auth";

import "../blocks/login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [inputs, setInputs] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="login">
      <p className="login__welcome">Log in</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          placeholder="Email"
          required
          id="email"
          className="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          required
          id="password"
          className="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login__button-container">
          <button type="submit" className="login__button">
            Log in
          </button>
        </div>
        <div className="login__signup">
          <p>Not a member yet?</p>
          <Link to="/signup" className="signup__link">
            Sign up here!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
