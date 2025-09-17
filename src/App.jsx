import { useState } from "react";
import { router } from "./routes/main-routes-file";
import { userAccountContext } from "./context/user-account-context";
import { loginStatusContext } from "./context/login-status-context";

// react router library
import { RouterProvider } from "react-router";

// Toaster library
import { Toaster } from "react-hot-toast";
//======================================================================================================================

function App() {
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [userAccounts, setUserAccount] = useState(() => {
    const storedAccounts = localStorage.getItem("userAccounts");
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  });

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
                zIndex: "10100",
              },
            }}
          />
        </div>
      </loginStatusContext.Provider>
    </userAccountContext.Provider>
  );
}

export default App;
