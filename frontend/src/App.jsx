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

            {/* Login Page */}
            <Route
              path="/login"
              element={<Login />}
            />

            {/* Main Dashboard */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Dashboard */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Redirect Unknown Routes */}
            <Route
              path="*"
              element={<Navigate to="/" />}
            />

          </Routes>

        </BrowserRouter>

      </AuthProvider>

  );
}

export default App;