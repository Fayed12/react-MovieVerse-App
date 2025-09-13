import "./login.css"
import SignIn from "../../components/signIn";
import SignUp from "../../components/signUp";
import { useState } from "react";

function LoginLayout() {
    const [loginStatus, setLoginStatus] = useState("signin");
    
    function handleSignUp() {
        if (loginStatus === "signin") {
            setLoginStatus("signup");
        } else {
            setLoginStatus("signin");
        }
    }
    return (
      <>
        <div className="login-page">
          <div className="login-form">
            <div className="header">
              <h1>Login Form</h1>
            </div>
            <div className="body">
              {loginStatus==="signin" ? <SignIn/> : <SignUp/>}
            </div>
            <div className="footer">
              <p>
                Not a member?{" "}
                <span onClick={handleSignUp}>{loginStatus === "signin" ? "signUp" : "signIn"}</span>
              </p>
            </div>
          </div>
        </div>
      </>
    );
}

export default LoginLayout;