import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useEffect, useState, useContext } from "react";
import { loginStatusContext } from "../context/login-status-context";

export default function LetterAvatars() {
  const { userLoginStatus, setUserLoginStatus } =
    useContext(loginStatusContext);
  const [userLoggedAccount, setUserLoggedAccount] = useState()
  
  function handleLogout() {
    let confirmLogout = confirm("Are you sure you want to logout?")

    if (!confirmLogout) {
      alert("Action has been closed!!")
    } else {
      sessionStorage.setItem("isLoggedIn", "false");
      setUserLoginStatus(false)
    }
  }

  useEffect(() => {
    let userAccount = JSON.parse(sessionStorage.getItem("userAccount"));
    if (userAccount) {
      setUserLoggedAccount(userAccount)
    }
  }, [setUserLoggedAccount])

  const user = userLoggedAccount ? userLoggedAccount.userName : "";
  const avatarLetter = user ? user.slice(0, 1).toUpperCase() : "";

  return (
    <Stack direction="row" spacing={2} onClick={handleLogout}>
      <Avatar style={{ cursor: "pointer" }}>{avatarLetter}</Avatar>
    </Stack>
  );
}
