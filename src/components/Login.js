import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import auth from "../utils/auth";
// import { signin, signup, checkToken } from "../utils/auth";
import "../blocks/login.css";

const Login = ({ onLogin }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [inputs, setInputs] = useState({});

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //     [name]: value

  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
    // you'll need to add your login code here
    //   if (!email || !password) {
    //     return;
    //   }
    //   auth
    //     .signin(email, password)
    //     .then((data) => {
    //       if (!data) {
    //         return setMessage("Something went wrong");
    //       }
    //       if (data.jwt) {
    //         setEmail("");
    //         setPassword("");
    //         this.setState(
    //           {
    //             email: "",
    //             password: "",
    //           },
    //           () => {
    //             onLogin();
    //             localStorage.setItem("token", data.jwt);
    //             history.push("/main");
    //           }
    //         );
    //       }
    //     })
    //     .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <p className="login__welcome">Log in</p>
      <form onSubmit={handleSubmit} className="login__form">
        {/* <label htmlFor="email">Email:</label> */}
        <input
          required
          id="email"
          className="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <label htmlFor="password">Password:</label> */}
        <input
          required
          id="password"
          className="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login__button-container">
          <button type="submit" className="login__link">
            Log in
          </button>
        </div>
        <div className="login__signup">
          <p>Ready to begin your journey?</p>
          <Link to="/signup" className="signup__link">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
