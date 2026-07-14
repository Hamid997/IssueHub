import { Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import MyProfilePage from "./pages/MyProfilePage";

import ProtectedRoute from "./routes/ProtectedRoute";
import SettingsPage from "./pages/SettingsPage";

export default function App() {

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MyProfilePage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/settings"
        element={<SettingsPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );

}