import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import InputLayout from "./input/main-input";
import { userAccountContext } from "../context/user-account-context";
import { loginStatusContext } from "../context/login-status-context";

function SignIn() {
  const navigate = useNavigate();
  const { userAccounts } = useContext(userAccountContext);
  const { userLoginStatus, setUserLoginStatus } =
    useContext(loginStatusContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const usersAccounts = JSON.parse(localStorage.getItem("userAccounts"));

  // function  to handle the submit form and compare the users
  function handleCheckLogin(e) {
    e.preventDefault();
    if (usersAccounts.length <= 0) {
      return;
    } else {
      usersAccounts.forEach((userAccount) => {
        if (
          userAccount.userEmail === userEmail &&
          userAccount.userPassword === userPassword
        ) {
          setUserLoginStatus(true);
          alert("login successfuly");
          setTimeout(() => {
            navigate("/home", { replace: true });
          }, 2000);
        } else {
          alert("something went wrong");
        }
      });
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
      </div>
    </>
  );
}

export default SignIn;
