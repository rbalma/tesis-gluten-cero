import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routesAuth, routesPages, routesAdmin, routesProfile } from "./routes";
import AdminScreen from "@/pages/Admin/AdminScreen";
import Profile from "@/pages/Profile";
import NotFoundScreen from "@/pages/NotFound/NotFoundScreen";
import { Main } from "../layout/Main";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      {routesAuth.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}

      <Route path="/" element={<Main />}>
        {routesPages.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Route>

        <Route path="admin" element={<AdminScreen />}>
          {routesAdmin.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Route>

            {/* SACAR DE ACÁ */}
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
