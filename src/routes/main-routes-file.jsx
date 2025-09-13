import { createBrowserRouter, Navigate } from "react-router";
import LoginLayout from "../pages/login-page/loginLayout";
import HomePage from "../pages/home-page/home";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);