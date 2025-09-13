import { createBrowserRouter } from "react-router";
import LoginLayout from "../pages/login-page/loginLayout";
import HomePage from "../pages/home-page/home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginLayout />
    },
    {
        path: "/login",
        element:<LoginLayout/>
    },
    {
        path: "/home",
        element:<HomePage/>
    }
])