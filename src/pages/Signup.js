const Signup = () => {
  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={() => alert("Google")}>
            <img src={"Google"} alt="Google icon" className="icon" />
            Google
          </div>
          <div className="loginButton github" onClick={() => alert("GitHub")}>
            <img src={"Github"} alt="Github icon" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button className="submit">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
