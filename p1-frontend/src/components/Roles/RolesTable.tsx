import React, { useContext, useState } from "react";
import { RoleInterface } from "../../interfaces/RoleInterface";
import { Table, Button, Modal } from "react-bootstrap";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RolesContext } from "../../contexts/RolesContext";
import toast from "react-hot-toast";

type Props = {
  roles: RoleInterface[];
};

const RolesTable = (props: Props) => {
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState({
    show: false,
    role: {} as RoleInterface,
  });
  const { roles, setRoles } = useContext(RolesContext);

  const handleDelete = (roleId: RoleInterface) => {
    setDeleteModal({ ...deleteModal, show: true, role: roleId });
  };

  const confirmDelete = async () => {
    setDeleteModal({ ...deleteModal, show: false });
    const response = await fetch(
      `http://localhost:8080/roles/${deleteModal.role.roleId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          //'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      }
    );

    if (response.ok) {
      const updatedRoles = roles.filter(
        (role) => role.roleId !== deleteModal.role.roleId
      );
      setRoles(updatedRoles);
      toast.success(`Role ${deleteModal.role.roleName} deleted successfully.`);
    } else {
      toast.error(`Error deleting role ${deleteModal.role.roleName}.`);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.roles.map((role, index) => (
            <tr key={role.roleId}>
              <td>{role.roleId}</td>
              <td>{role.roleName}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() =>
                    navigate(
                      `/roles/edit/${role.roleId}`,
                    )
                  }
                  className="me-2"
                >
                  <FaPencilAlt />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    handleDelete(
                      role
                        ? role
                        : { roleId: 0 }
                    )
                  }
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={deleteModal.show}
        onHide={() => setDeleteModal({ ...deleteModal, show: false })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete Role {deleteModal.role.roleName}?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeleteModal({ ...deleteModal, show: false })}
          >
            Close
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RolesTable;
