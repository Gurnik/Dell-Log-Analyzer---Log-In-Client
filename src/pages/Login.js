import Google from "../images/google.png";
import Github from "../images/github.png";
import { Link } from "react-router-dom";
import React from "react";
import { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

<<<<<<< Updated upstream
=======
import axios from '../api/axios';
// const LOGIN_URL = 'http://localhost:3001/login';
// const LOGIN_URL2 = 'http://localhost:3001/login';

>>>>>>> Stashed changes


const Login = () => {

  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const [usernameOrEmail, setUserameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const isEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };
<<<<<<< Updated upstream
=======
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
  const [company, setCompany] = useState('');
  const [allUsers, setusers] = useState([]);
  useEffect(() => {
    console.log('useEffect is running');
    const fetchData = async () => {
      try {
        const res = await axios.get('/login');
        setusers(await res.data)
        // var select = document.getElementById('companyname')
        // for (let index = 0; index < allUsers.length; index++) {
        //   const element = allUsers[index];
        //   console.log(element?.username)
        //   var op = document.createElement('option')
        //   op.value = element?.username
        //   op.textContent = element?.username
        //   select.append(op)
        // }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Data:", error.response.data);
          console.log("Status:", error.response.status);
          console.log("Headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("Request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error:", error.message);
        }
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    userRef.current.focus()
  }, [])
  useEffect(() => {
    setErrMsg('')
  }, [usernameOrEmail, password])

  // const navigate = useNavigate();


>>>>>>> Stashed changes
  const submit = async () => {
    var body = {};
    console.log(usernameOrEmail)
    console.log(password)
    if (isEmail(usernameOrEmail)) {
<<<<<<< Updated upstream
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
    // const response = await fetch('http://localhost:3001/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ body }),
    //   type: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    var response = "success"
    console.log(response);
=======
      email = usernameOrEmail
      username = ''

    } else {

      email = ''
      username = usernameOrEmail
    }
    try {
      const response = await axios.post('/login',
        JSON.stringify({ "email": email, "username": username, "password": password,"company":company }),
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
>>>>>>> Stashed changes

    if (response === "success") {
      setauthenticated(true)
      localStorage.setItem("authenticated", true);
    }
<<<<<<< Updated upstream
    
=======
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



>>>>>>> Stashed changes
  };


  const google = () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:3001/auth/github", "_self");
  };

  return (
<<<<<<< Updated upstream
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
=======
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
              <select
                onChange={(event) => setCompany(event.target.value)}
                className="companyname" id="companyname"
              >
                {allUsers.map((option) => {
                  return (
                    <option key={option.company} value={option.company}>
                      {option.company}
                    </option>
                  );
                })}
              </select>

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
              <Link className="link" to="../forgotPassword">
                Forgot Password?
              </Link>
              <Link className="link" to="../Signup">
                Sign Up
              </Link>
            </div>
>>>>>>> Stashed changes
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
