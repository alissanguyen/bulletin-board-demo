import * as React from "react";
import "./App.css";
import LoginForm from "./LoginForm/LoginForm";


function App() {
  const customizableText1 = "Sign in to your account"
  


  return (
    <div className="main">
      <p className="header-text">{customizableText1}</p>
      <LoginForm vertical={true}/>
    </div>
  );
}

export default App;
