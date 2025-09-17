import "./login.css";
import { useState, useContext, useEffect } from "react";
import { loginStatusContext } from "../../context/login-status-context";
import LoginSuccessPopup from "../../components/login-success-popup/login-success";
import LoadingPage from "../../components/loading/loading";

// react router library
import { Outlet, useNavigate } from "react-router";
//======================================================================================================================

function LoginLayout() {
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState("signin");
  const { userLoginStatus, setUserLoginStatus } =
    useContext(loginStatusContext);

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

  useEffect(() => {
    if (userLoginStatus === true) {
      setOpenPopup(true);
      const loadingTimer = setTimeout(() => {
        setOpenLoading(true);
      }, 2000);
      const timer = setTimeout(() => {
        setOpenPopup(false);
        setOpenLoading(false);
      }, 4000);

      function clearTime() {
        clearTimeout(timer);
        clearTimeout(loadingTimer);
      }

      return () => clearTime();
    } else {
      setOpenPopup(false);
    }
  }, [userLoginStatus]);

  // check if the user is loggedIn
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setOpenLoading(true);
      setUserLoginStatus(true);
      const navigateTimer = setTimeout(() => {
        navigate("/home", { replace: true });
        setOpenLoading(false);
      }, 2000);

      return () => {
        clearTimeout(navigateTimer);
      };
    }
  }, [navigate, setUserLoginStatus]);

  return (
    <>
      <div className="login-page">
        {openLoading ? (
          <LoadingPage />
        ) : (
          <div className="login-form">
            <div className="header">
              <h1>Login Form</h1>
            </div>
            <div className="body">
              <Outlet context={{ setLoginStatus }} />
            </div>
            <div className="login-footer">
              <p>
                Not a member?
                <span onClick={handleSignUp}>
                  {loginStatus === "signin" ? "signUp" : "signIn"}
                </span>
              </p>
            </div>
          </div>
        )}
        {openPopup && <LoginSuccessPopup />}
      </div>
    </>
  );
}

export default LoginLayout;
