import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routesPages, routesAdmin, routesProfile } from "./routes";
import AdminScreen from "@/pages/Admin/AdminScreen";
import Profile from "@/pages/Profile";
import NotFoundScreen from "@/pages/NotFound/NotFoundScreen";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        /> */}

        {routesPages.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}

        <Route path="admin" element={<AdminScreen />}>
          {routesAdmin.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Route>

        <Route path="/perfil/:id" element={<Profile />}>
          {routesProfile.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Route>

        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
