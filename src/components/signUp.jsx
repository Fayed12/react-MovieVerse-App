import InputLayout from "./input/main-input";
import { useContext, useState, useEffect } from "react";
import { userAccountContext } from "../context/user-account-context";

// react router library
import { useNavigate, useOutletContext } from "react-router";

// toast library
import toast from "react-hot-toast";
//======================================================================================================================

function SignUp() {
  const navigate = useNavigate();
  const { setLoginStatus } = useOutletContext();
  const { userAccounts, setUserAccount } = useContext(userAccountContext);
  const [newUserAccount, setNewUserAccount] = useState({
    id: Date.now(),
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  // store the data to localstorage
  useEffect(() => {
    localStorage.setItem("userAccounts", JSON.stringify(userAccounts));
  }, [userAccounts]);

  // validation of the input field
  const userNameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+){1,2}$/;
  const userEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com$/;

  // function to handle the user sign up after save the account
  function handleUserAccountSave(e) {
    e.preventDefault();
    if (
      newUserAccount.userName.trim() === "" ||
      newUserAccount.userEmail.trim() === "" ||
      newUserAccount.userPassword.trim() === ""
    ) {
      toast.error("please fill all fields!!", { id: "main-toast" });
      return;
    } else {
      if (!userNameRegex.test(newUserAccount.userName.trim())) {
        toast.error("please enter valid Name ex. 'john doe (alex)'", {
          id: "main-toast",
        });
      } else if (!userEmailRegex.test(newUserAccount.userEmail.trim())) {
        toast.error("please enter valid email ex.'example@gmail.com'", {
          id: "main-toast",
        });
      } else {
        const nameExist = userAccounts.some(
          (user) =>
            user.userName.toLowerCase().trim() ===
            newUserAccount.userName.toLowerCase().trim()
        );
        const emailExist = userAccounts.some(
          (user) =>
            user.userEmail.toLowerCase().trim() ===
            newUserAccount.userEmail.toLowerCase().trim()
        );
        if (nameExist) {
          toast.error("this user name is already exist, try another one", {
            id: "main-toast",
          });
        } else if (emailExist) {
          toast.error("this user email is already exist, try another one", {
            id: "main-toast",
          });
        } else {
          setUserAccount([...userAccounts, newUserAccount]);
          setNewUserAccount({
            id: Date.now(),
            userName: "",
            userEmail: "",
            userPassword: "",
          });
          toast.success("signUp is done successfully", {
            id: "main-toast",
          });
          setTimeout(() => {
            navigate("/login/signin", { replace: true });
            setLoginStatus("signin");
          }, 2000);
        }
      }
    }
  }
  return (
    <>
      <div className="signIn">
        <div className="input-form">
          <form onSubmit={(e) => handleUserAccountSave(e)}>
            <InputLayout
              id="signup1"
              type="text"
              placeholder="userName"
              userValue={newUserAccount?.userName}
              setValue={(e) =>
                setNewUserAccount({
                  ...newUserAccount,
                  userName: e.target.value.trim(),
                })
              }
            />
            <InputLayout
              id="signup2"
              type="email"
              placeholder="example@gmail.com"
              userValue={newUserAccount?.userEmail}
              setValue={(e) =>
                setNewUserAccount({
                  ...newUserAccount,
                  userEmail: e.target.value.trim(),
                })
              }
            />
            <InputLayout
              id="signup3"
              type="password"
              placeholder="password"
              userValue={newUserAccount?.userPassword}
              setValue={(e) =>
                setNewUserAccount({
                  ...newUserAccount,
                  userPassword: e.target.value.trim(),
                })
              }
            />
            <div className="button">
              <button type="button">Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
