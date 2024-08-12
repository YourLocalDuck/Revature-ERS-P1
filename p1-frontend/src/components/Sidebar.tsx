import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaSignal, FaSuitcaseRolling, FaPeopleCarry, FaPeopleArrows } from "react-icons/fa";
import "../css/Sidebar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

type Props = {};

const Sidebar = (props: Props) => {
  const navigate = useNavigate();

  const handleNavigation =
    (path: string) => (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      navigate(path);
    };

  const { user } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column vh-100 bg-light border-end p-3">
      <Nav className="flex-column">
        <Nav.Link
          className="d-flex align-items-center mb-3"
          onClick={handleNavigation("/dashboard")}
        >
          <FaHome className="me-2" /> Home
        </Nav.Link>
        <Nav.Link
          className="d-flex align-items-center mb-3"
          onClick={handleNavigation("/reimbursements")}
        >
          <FaUser className="me-2" /> Reimbursements
        </Nav.Link>
        {user?.role?.roleName !== "Employee" && (
          <>
            <Nav.Link
              className="d-flex align-items-center mb-3"
              onClick={handleNavigation("/users")}
            >
              <FaPeopleArrows className="me-2" /> Users
            </Nav.Link>
            {user?.role?.roleName === "Superuser" && (
              <>
                <Nav.Link
                  className="d-flex align-items-center mb-3"
                  onClick={handleNavigation("/roles")}
                >
                  <FaSuitcaseRolling className="me-2" /> Roles
                </Nav.Link>
                <Nav.Link
                  className="d-flex align-items-center mb-3"
                  onClick={handleNavigation("/reimbursement-statuses")}
                >
                  <FaSignal className="me-2" /> Reimbursements Statuses
                </Nav.Link>
              </>
            )}
          </>
        )}
      </Nav>
      <Nav className="mt-auto">
        <Nav.Link href="/" className="d-flex align-items-center">
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
