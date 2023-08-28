import Google from "../images/google.png";
import Github from "../images/github.png";
import { Link } from "react-router-dom";
import React from "react";
import { useState } from 'react'


const Login = () => {
  const [usernameOrEmail, setUserameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const isEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };
  const submit = async () => {
    var body = {};
    console.log(usernameOrEmail)
    console.log(password)
    if (isEmail(usernameOrEmail)) {
      body = {
        email: usernameOrEmail,
        username: '',
        password: password
      };
    } else {
      body = {
        email: '',
        username: usernameOrEmail,
        password: password
      };
    }
    console.log(body)
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify({ body }),
      type: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
  };

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="Google icon" className="icon" />
            Google
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="Github icon" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="text" placeholder="Enter username or email"
            onChange={(e) => setUserameOrEmail(e.target.value)}
            value={usernameOrEmail}
          />
          <input type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password" required />
          <button className="submit" onClick={submit}>Login</button>
          <Link className="link" to="../Signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
