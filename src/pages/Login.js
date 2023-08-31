import Google from "../images/google.png";
import Github from "../images/github.png";
import { Link } from "react-router-dom";
import React, { Component } from "react";
// import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";

import axios from '../api/axios';
const LOGIN_URL = 'http://localhost:3001/login';


const Login = () => {
  const navigate = useNavigate();

  const isEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };
  const { setAuth } = useContext(AuthContext)
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
    var email
    var username
    if (isEmail(usernameOrEmail)) {
        email=usernameOrEmail
        username= ''
    
    } else {

        email= ''
        username= usernameOrEmail
    }
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ "email":email,"username":username,"password":password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true

        }
      );
      console.log(JSON.stringify(response?.data))
  
      setUserameOrEmail('')
      setPassword('')
      setSuccess(true)
      navigate('/home')

    }
    catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  


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
