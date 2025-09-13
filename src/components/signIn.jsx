import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import InputLayout from "./input/main-input";
import LoginFailedPopup from "./login-failed-popup/login-failed";
import { loginStatusContext } from "../context/login-status-context";

function SignIn() {
  const navigate = useNavigate();
  const { setUserLoginStatus } = useContext(loginStatusContext);
  const [openPopup, setOpenPopup] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // load data from localstorage
  const usersAccounts = JSON.parse(localStorage.getItem("userAccounts"));

  // function  to handle the submit form and compare the users
  function handleCheckLogin(e) {
    e.preventDefault();
    if (usersAccounts.length <= 0) {
      alert("something went wrong");
      return;
    } else {
      const foundUser = usersAccounts.find(
        (userAccount) =>
          userAccount.userEmail === userEmail &&
          userAccount.userPassword === userPassword
      );

      if (foundUser) {
        setUserLoginStatus(true);
            sessionStorage.setItem("isLoggedIn", "true");
            setTimeout(() => {
              navigate("/home", { replace: true });
            }, 3000);
      } else {
        setOpenPopup(true)
        setTimeout(() => {
          setOpenPopup(false)
        }, 2000);
      }
    }
  }

  return (
    <>
      <div className="signIn">
        <div className="input-form">
          <form onSubmit={(e) => handleCheckLogin(e)}>
            <InputLayout
              type="email"
              placeholder="example@gmail.com"
              userValue={userEmail}
              setValue={(e) => setUserEmail(e.target.value)}
            />
            <InputLayout
              type="password"
              placeholder="password"
              value={userPassword}
              setValue={(e) => setUserPassword(e.target.value)}
              min={6}
              max={32}
            />
            <div className="button">
              <button>signIn</button>
            </div>
          </form>
        </div>
        {openPopup && <LoginFailedPopup/>}
      </div>
    </>
  );
}

export default SignIn;
