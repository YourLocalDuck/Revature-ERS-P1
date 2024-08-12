import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users/Users";
import Roles from "./components/Roles/Roles";
import ReimbursementStatuses from "./components/ReimbursementStatuses/ReimbursementStatuses";
import Reimbursements from "./components/Reimbursements/Reimbursements";
import Sidebar from "./components/Sidebar";
import AddUpdateReimbursements from "./components/Reimbursements/AddUpdateReimbursements";
import AddUpdateReimbursementStatuses from "./components/ReimbursementStatuses/AddUpdateReimbursementStatuses";
import AddUpdateRoles from "./components/Roles/AddUpdateRoles";
import AddUpdateUsers from "./components/Users/AddEditUsers";
import { AuthContext } from "./contexts/AuthContext";
import Register from "./components/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { user, setUser, fetchUser } = useContext(AuthContext);

  useEffect(() => {
    // Add any necessary logic here
  }, []);

  // Function to pass into the LoginPage component as prop.
  const handleLogin = () => {
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
                  <Route path="/users" element={<Users />} />
                  <Route path="/users/add" element={<AddUpdateUsers />} />
                  <Route path="/users/edit/:id" element={<AddUpdateUsers />} />
                  <Route path="/roles" element={<Roles />} />
                  <Route path="/roles/add" element={<AddUpdateRoles />} />
                  <Route path="/roles/edit/:id" element={<AddUpdateRoles />} />
                  <Route path="/reimbursements" element={<Reimbursements />} />
                  <Route path="/reimbursements/add" element={<AddUpdateReimbursements />} />
                  <Route
                    path="/reimbursements/edit/:id"
                    element={<AddUpdateReimbursements />} />
                  <Route
                    path="/reimbursement-statuses"
                    element={<ReimbursementStatuses />}
                  />
                  <Route path="/reimbursement-statuses/add" element={<AddUpdateReimbursementStatuses />} />
                  <Route
                    path="/reimbursement-statuses/edit/:id"
                    element={<AddUpdateReimbursementStatuses />} />
                  <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/auth/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/*" element={<LoginPage onLogin={handleLogin} />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;