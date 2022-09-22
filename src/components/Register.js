import { useState, useHistory } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

const Register = ({ handleRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [inputs, setInputs] = useState({});

  // const history = useHistory();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setInputs((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ email, password });
    // const { email, password } = inputs;
    // if (!email || !password) {
    //   return;
    // }

    //   if (res) {

    //     setMessage("");
    //     onRegister();
    //     history.push("/signin");
    //   } else {

    //     setMessage("Something went wrong, please try again.");
    //   }
  };
  return (
    <div className="register">
      <h2 className="register__title">Sign up</h2>
      <p className="register__error">{inputs.message}</p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="email">Email</label>
        <input
          placeholder="Email"
          required
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          placeholder="Password"
          required
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="register__button-container">
          <button type="submit" className="register__button">
            Sign up
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p>Already a member?</p>
        <Link to="login" className="register__login-link">
          Log in here
        </Link>
      </div>
    </div>
  );
};

export default Register;
