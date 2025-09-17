import LoginLayout from "../pages/login-page/loginLayout";
import MainPageLayout from "../pages/main-page/main-page-layout";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
import ProtectedRoute from "./ProtectedRoute";

// react router library
import { createBrowserRouter } from "react-router";
//======================================================================================================================

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainPageLayout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <MainPageLayout />
      </ProtectedRoute>
    ),
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
]);