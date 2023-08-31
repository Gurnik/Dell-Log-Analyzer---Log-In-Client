import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sub from "./sub";
import "../design/sign.css";

function Sign() {
  // States for registration
  const navigate = useNavigate();
  const [Fname, setFName] = useState("");
  const [Lname, setLName] = useState("");
  const [Uname, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhonenun] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleFName = (e) => {
    setFName(e.target.value);
    setSubmitted(false);
  };

  // Handling the name change
  const handleLName = (e) => {
    setLName(e.target.value);
    setSubmitted(false);
  };

  // Handling the name change
  const handleUserName = (e) => {
    setUName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handlePhone = (e) => {
    setPhonenun(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const next = (e) => {
    e.preventDefault();
    if (
      Fname === "" ||
      phoneNum === "" ||
      Lname === "" ||
      Uname === "" ||
      email === "" ||
      password === ""
    ) {
		errorMessage("Please enter all the fields");
    } else {
	  navigate('/sub',{
		state: {
		  Fname,
		  Lname,
		  Uname,
		  email,
		  phoneNum,
		  password
		}
	  });
      setError(false);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {Fname + " " + Lname} successfully registered!</h1>
      </div>
    );
  };

  const errorMessage = (message) => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>{message}</h1>
      </div>
    );
  };

  return (
    <div className="container">
      <center>
        <div>
          <h1>User Registration</h1>
    </div>

        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>

        <form>
          {/* Labels and inputs for form data */}
          <label className="label">First Name</label>
          <input
            onChange={handleFName}
            className="input"
            value={Fname}
            type="text"
          />
          <br></br>

          <label className="label">Last Name</label>
          <input
            onChange={handleLName}
            className="input"
            value={Lname}
            type="text"
          />
          <br></br>

          <label className="label">username</label>
          <input
            onChange={handleUserName}
            className="input"
            value={Uname}
            type="text"
          />
          <br></br>

          <label className="label">Phone number</label>
          <input
            onChange={handlePhone}
            className="input"
            value={phoneNum}
            type="text"
          />
          <br></br>

          <label className="label">Email</label>
          <input
            onChange={handleEmail}
            className="input"
            value={email}
            type="email"
          />
          <br></br>

          <label className="label">Password</label>
          <input
            onChange={handlePassword}
            className="input"
            value={password}
            type="password"
          />
          <br></br>

          <label className="label">Confirm password</label>
          <input
            onChange={handleConfirmPasswordChange}
            className="input"
            value={confirmPassword}
            type="password"
          />
          <br></br>

          <button onClick={next} className="btn" type="next">
            next
          </button>
        </form>
      </center>
    </div>
  );
}


export default Sign;
