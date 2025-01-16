import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllowedRoutes } from "../../RoutePermissions";
import LOGO_IMG from "../../assets/Logo.jpg";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate for redirection

  // Get the logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Get allowed routes for the current user
  const allowedRoutes = getAllowedRoutes(loggedInUser?.role);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Clear user details from localStorage
    navigate("/"); // Redirect to the login page
  };

  // List of navigation items
  const navigationItems = [
    { path: "/admin", label: "Admin" },
    { path: "/manager", label: "Manager" },
    { path: "/employee", label: "Employee" },
    { path: "/appraisal/requests", label: "Appraisal Requests" }, // Accessible to everyone
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="content-container">
          <div className="upper-header">
            <img src={LOGO_IMG} alt="Logo" className="logo" />
            <nav className="navbar">
              <ul>
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={allowedRoutes.includes(item.path) ? "" : "disabled-link"}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {/* Logout Button */}
                {loggedInUser && (
                  <li>
                    <button onClick={handleLogout} className="logout-button">
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </nav>
            <button className="menu-button" onClick={toggleSidebar}>
              ☰
            </button>
          </div>
        </div>
        <div className={`sm-sidebar ${isSidebarOpen ? "open" : "close"}`}>
          <div className="sidebar-header">
            <p>Amble</p>
            <button className="close-button" onClick={toggleSidebar}>
              ✕
            </button>
          </div>
          <nav className="sidebar-nav">
            <ul>
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={allowedRoutes.includes(item.path) ? "" : "disabled-link"}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {/* Logout Button in Sidebar */}
              {loggedInUser && (
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
