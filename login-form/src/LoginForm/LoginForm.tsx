import * as React from "react";

interface Props {
  vertical: boolean;
}

const LoginForm: React.FC<Props> = (props) => {
  function signIn() {
    alert("Yay!");
  }
  return (
    <div className="login-form">
      <div className="login-credentials">
        <input className="email" placeholder="Email address"></input>
        <input
          className="password"
          placeholder="Password"
          type="password"
        ></input>
      </div>

      <div className="login-others">
        <div className="remember-me">
          <input className="check-box" id="remember-me" type="checkbox" />
          <label htmlFor="remember-me">   Remember me</label>
        </div>
        <div className="forgot-pw">
          <a href="google.com">Forgot your password?</a>
        </div>
      </div>

      <button className="sign-in-button" onClick={() => signIn()}>
        Sign In
      </button>
    </div>
  );
};

export default LoginForm;
