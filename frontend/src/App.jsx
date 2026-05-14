import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          {/* Redirect root to login */ }
          <Route
            path="/"
            element={<Navigate to="/login" />}
          />

          {/* Login Route */ }
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Protected Dashboard Route */ }
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Dashboard Route */ }
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all Route to redirect to login */ }
          <Route
            path="*"
            element={<Navigate to="/login" />}
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>

  );
}

export default App;