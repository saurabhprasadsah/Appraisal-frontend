import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Manager from "./pages/Manager";
import Employee from "./pages/Employee";
import JuniorEmployee from "./pages/JuniorEmployee";
import AppraisalRequests from "./pages/AppraisalRequests";
import AuthRoute from "./AuthRoute";
import PublicRoute from "./PublicRoute";
import Header from "./components/ui/Header";
import "./App.css";
import "./styles/main.scss";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route for Login */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <AuthRoute>
              <Header />
              <Admin />
            </AuthRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <AuthRoute>
              <Header />
              <Manager />
            </AuthRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <AuthRoute>
              <Header />
              <Employee />
            </AuthRoute>
          }
        />
        <Route
          path="/junior_employee"
          element={
            <AuthRoute>
              <Header />
              <JuniorEmployee />
            </AuthRoute>
          }
        />

        {/* Appraisal System */}
        <Route
          path="/appraisal/requests"
          element={
            <AuthRoute>
              <Header />
              <AppraisalRequests />
            </AuthRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
