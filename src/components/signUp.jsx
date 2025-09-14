import InputLayout from "./input/main-input";
import { useContext, useState, useEffect } from "react";
import { userAccountContext } from "../context/user-account-context";
import { useNavigate, useOutletContext } from "react-router";

function SignUp() {
  const navigate = useNavigate();
  const {setLoginStatus} = useOutletContext()
  const { userAccounts, setUserAccount } = useContext(userAccountContext);
  const [newUserAccount, setNewUserAccount] = useState({
    id: Date.now(),
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  function handleAddNewUserAccount(e) {
    e.preventDefault();
    setUserAccount([...userAccounts, newUserAccount]);
    setNewUserAccount({
      id: "",
      userName: "",
      userEmail: "",
      userPassword: "",
    });
    alert("signUp is done successfully");
    setTimeout(() => {
      navigate("/login/signin", { replace: true });
      setLoginStatus("signin");
    }, 3000);
  }

  // store the data to localstorage
  useEffect(() => {
    localStorage.setItem("userAccounts", JSON.stringify(userAccounts));
  }, [userAccounts]);
  return (
    <>
      <div className="signIn">
        <div className="input-form">
          <form onSubmit={(e) => handleAddNewUserAccount(e)}>
            <InputLayout
              type="text"
              placeholder="userName"
              value={newUserAccount?.userName}
              setValue={(e) =>
                setNewUserAccount({
                  ...newUserAccount,
                  userName: e.target.value,
                })
              }
            />
            <InputLayout
              type="email"
              placeholder="example@gmail.com"
              userValue={newUserAccount?.userEmail}
              setValue={(e) =>
                setNewUserAccount({
                  ...newUserAccount,
                  userEmail: e.target.value,
                })
              }
            />
            <InputLayout
              type="password"
              placeholder="password"
              value={newUserAccount?.userPassword}
              setValue={(e) =>
                setNewUserAccount({
                  ...newUserAccount,
                  userPassword: e.target.value,
                })
              }
            />
            <div className="button">
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
