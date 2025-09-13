import { RouterProvider } from "react-router";
import { router } from "./routes/main-routes-file";
import { useState } from "react";
import { userAccountContext } from "./context/user-account-context";
import { loginStatusContext } from "./context/login-status-context";

function App() {
  const [userAccounts, setUserAccount] = useState([])
  const [userLoginStatus, setUserLoginStatus] = useState(false);


  return (
    <userAccountContext.Provider value={{ userAccounts, setUserAccount }}>
      <loginStatusContext.Provider value={{ userLoginStatus, setUserLoginStatus }}>
        <div className="all-page">
          <div className="overlay"></div>
          <RouterProvider router={router} />
        </div>
      </loginStatusContext.Provider>
    </userAccountContext.Provider>
  );
}

export default App;