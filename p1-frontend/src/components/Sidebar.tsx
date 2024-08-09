import React from "react";
import { Nav } from "react-bootstrap";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import "../css/Sidebar.css";
import { useNavigate } from "react-router-dom";

type Props = {};

const Sidebar = (props: Props) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light border-end p-3">
      <Nav className="flex-column">
        <Nav.Link className="d-flex align-items-center mb-3" onClick={handleNavigation("/dashboard")}>
          <FaHome className="me-2" /> Home
        </Nav.Link>
        <Nav.Link className="d-flex align-items-center mb-3" onClick={handleNavigation("/reimbursements")}>
          <FaUser className="me-2" /> Reimbursements
        </Nav.Link>
        <Nav.Link className="d-flex align-items-center mb-3" onClick={handleNavigation("/users")}>
          <FaCog className="me-2" /> Users
        </Nav.Link>
        <Nav.Link className="d-flex align-items-center mb-3" onClick={handleNavigation("/roles")}>
          <FaCog className="me-2" /> Roles
        </Nav.Link>
        <Nav.Link className="d-flex align-items-center mb-3" onClick={handleNavigation("/reimbursement-statuses")}>
          <FaCog className="me-2" /> Reimbursements Statuses
        </Nav.Link>
      </Nav>
      <Nav className="mt-auto">
        <Nav.Link className="d-flex align-items-center">
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
