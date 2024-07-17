import React from "react";
import { Navigate } from "react-router-dom";

// Pages
import Login from "../pages/auth/Login/LoginPage";
import Register from "../pages/auth/Signup/SignupPage";
import Home from "../pages/Home/Home";
import ProductDetail from "../pages/Products/ProductDetailPage";

const authProtectedRoutes = [
  { path: "/home", component: Home },
  { path: "/product-detail", component: ProductDetail },
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
