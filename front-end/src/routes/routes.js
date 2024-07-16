import React from "react";
import { Navigate } from "react-router-dom";

// Pages
import Login from "../pages/auth/Login/LoginPage";
import Register from "../pages/auth/Signup/SignupPage";
import Home from "../pages/Home/Home";

const authProtectedRoutes = [
  // Home page
  { path: "/home", component: Home },
  {
    path: "/",
    exact: true,
    component: () => <Navigate to="/home" />,
  },
];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

export { authProtectedRoutes, publicRoutes };
