import Google from "../images/google.png";
import Github from "../images/github.png";
import { Link } from "react-router-dom";
import React, { Component } from "react";
// import { Redirect } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";

import axios from '../api/axios';
const LOGIN_URL = '/auth';


const Login = () => {
  const isEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };
  const {setAuth}  = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()
  // const [authenticated, setauthenticated] = useState(
  //   localStorage.getItem(localStorage.getItem("authenticated") || false)
  // );
  const [usernameOrEmail, setUserameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    userRef.current.focus()
  }, [])
  useEffect(() => {
    setErrMsg('')
  }, [usernameOrEmail, password])

  // const navigate = useNavigate();

  
  const submit = async () => {
    var body = {};
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
    try{
      const response = await axios.post(LOGIN_URL)
        setUserameOrEmail('')
        setPassword('')
        setSuccess(true)
    }
    catch{

    }
    // const response = await fetch('http://localhost:3001/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ body }),
    //   type: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    // var response = "success"
    // console.log(response);

    // if (response === "success") {
    //   setauthenticated(true)
    //   localStorage.setItem("authenticated", true);
    //   navigate('/dashboard');
    // }
    

  };


  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
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
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

              <input type="text"
                placeholder="Enter username or email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUserameOrEmail(e.target.value)}
                value={usernameOrEmail}
                required
              />
              <input type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required />
              <button className="submit" onClick={submit}>Login</button>
              <Link className="link" to="../Signup">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
