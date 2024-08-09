import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users/Users";
import Roles from "./components/Roles/Roles";
import ReimbursementStatuses from "./components/ReimbursementStatuses/ReimbursementStatuses";
import Reimbursements from "./components/Reimbursements/Reimbursements";
import Sidebar from "./components/Sidebar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check login status here (e.g., from local storage or an API call)
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoggedIn(true);
  }, []);

  // Function to pass into the LoginPage component as prop.
  const handleLogin = (email: string, password: string) => {
    localStorage.setItem("token", "your-token");
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? (
          <div>
            <NavBar />
            <div className="d-flex">
              <div className="w-20">
                <Sidebar />
              </div>
              <div className="p-2 flex-grow-1">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/auth/login"
                    element={<LoginPage onLogin={handleLogin} />}
                  />
                  <Route path="/users" element={<Users />} />
                  <Route path="/roles" element={<Roles />} />
                  <Route path="/reimbursements" element={<Reimbursements />} />
                  <Route
                    path="/reimbursement-statuses"
                    element={<ReimbursementStatuses />}
                  />
                  <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
