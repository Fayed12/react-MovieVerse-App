import { loginStatusContext } from "../context/login-status-context";
import { useContext } from "react";
import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  const { userLoginStatus } = useContext(loginStatusContext);

  return userLoginStatus ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;