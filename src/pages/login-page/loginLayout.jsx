import "./login.css";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";


function LoginLayout() {
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState("signin");
    
    // function to navigate between signin and signup
  function handleSignUp() {
    if (loginStatus === "signin") {
      setLoginStatus("signup");
      navigate("signup", { replace: true });
    } else {
      setLoginStatus("signin");
      navigate("signin", { replace: true });
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
            <Outlet />
          </div>
          <div className="footer">
            <p>
              Not a member?{" "}
              <span onClick={handleSignUp}>
                {loginStatus === "signin" ? "signUp" : "signIn"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginLayout;
