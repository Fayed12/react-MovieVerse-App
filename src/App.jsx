import { RouterProvider } from "react-router";
import { router } from "./routes/main-routes-file";
import { useState } from "react";
import { userAccountContext } from "./context/user-account-context";

function App() {
  const [userAccounts, setUserAccount] = useState([])

  return (
    <userAccountContext.Provider value={{ userAccounts, setUserAccount }}>
      <div className="all-page">
        <div className="overlay"></div>
        <RouterProvider router={router} />
      </div>
    </userAccountContext.Provider>
  );
}

export default App;