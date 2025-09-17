/* eslint-disable no-unused-vars */
import { RouterProvider } from "react-router";
import { router } from "./routes/main-routes-file";
import { useState } from "react";
import { userAccountContext } from "./context/user-account-context";
import { loginStatusContext } from "./context/login-status-context";

// Toaster
import { Toaster } from "react-hot-toast";

function App() {
  const [userAccounts, setUserAccount] = useState(() => {
    const storedAccounts = localStorage.getItem("userAccounts");
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  })
  const [userLoginStatus, setUserLoginStatus] = useState(false);


  return (
    <userAccountContext.Provider value={{ userAccounts, setUserAccount }}>
      <loginStatusContext.Provider
        value={{ userLoginStatus, setUserLoginStatus }}
      >
        <div className="all-page">
          <div className="overlay"></div>
          <RouterProvider router={router} />
          <Toaster
            position="top-center"
            reverseOrder={true}
            toastOptions={{
              style: {
                position: "relative",
                zIndex:"10100"
              },
            }}
          />
        </div>
      </loginStatusContext.Provider>
    </userAccountContext.Provider>
  );
}

export default App;