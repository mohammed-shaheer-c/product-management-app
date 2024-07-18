import React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProtected, AccessRoute } from "./authProtected";
import { authProtectedRoutes, publicRoutes } from "./routes";
import Layout from "../components/common/Layout";

const Index = () => {
  return (
    <Routes>
      {publicRoutes.map((route, idx) => (
       
          <Route
            key={idx}
            path={route.path}
            element={
              <AccessRoute>
                <route.component />
              </AccessRoute>
          }
          />
        
      ))}

      {authProtectedRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            <AuthProtected>
              <Layout>
                <route.component />
              </Layout>
            </AuthProtected>
          }
        />
      ))}
    </Routes>
  );
};

export default Index;
