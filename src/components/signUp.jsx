import InputLayout from "./input/main-input";
import { useContext, useState } from "react";
import { userAccountContext } from "../context/user-account-context";
import { useNavigate } from "react-router";

function SignUp() {
    const navigate = useNavigate();
    const { userAccounts, setUserAccount } = useContext(userAccountContext);
    const [newUserAccount, setNewUserAccount] = useState({
      userName: "",
      userEmail: "",
      userPassword: "",
    });

    function handleAddNewUserAccount(e) {
        e.preventDefault()
        setUserAccount([...userAccounts, newUserAccount])
        setNewUserAccount({
          userName: "",
          userEmail: "",
          userPassword: "",
        });
        alert("done");
        setTimeout(() => {
            navigate("/login/signin", { replace: true });
        } , 3000)
    }
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
              <button>register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
