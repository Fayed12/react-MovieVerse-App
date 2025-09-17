import { useEffect, useState, useContext } from "react";
import { loginStatusContext } from "../context/login-status-context";

// MUI library
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

// toast library
import toast from "react-hot-toast";
//======================================================================================================================

export default function LetterAvatars() {
  const { setUserLoginStatus } = useContext(loginStatusContext);
  const [userLoggedAccount, setUserLoggedAccount] = useState();

  function handleLogout() {
    let confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
      toast.error("Action has been closed!!", { id: "main-toast" });
    } else {
      toast.loading("Logging out...", { id: "main-toast" });
      setTimeout(() => {
        sessionStorage.setItem("isLoggedIn", "false");
        setUserLoginStatus(false);
        toast.success("you are logged out", { id: "main-toast" });
      }, 2000);
    }
  }

  useEffect(() => {
    let userAccount = JSON.parse(sessionStorage.getItem("userAccount"));
    if (userAccount) {
      setUserLoggedAccount(userAccount);
    }
  }, [setUserLoggedAccount]);

  const user = userLoggedAccount ? userLoggedAccount.userName : "";
  const avatarLetter = user ? user.slice(0, 1).toUpperCase() : "";

  return (
    <Stack direction="row" spacing={2} onClick={handleLogout}>
      <Avatar style={{ cursor: "pointer" }}>{avatarLetter}</Avatar>
    </Stack>
  );
}
