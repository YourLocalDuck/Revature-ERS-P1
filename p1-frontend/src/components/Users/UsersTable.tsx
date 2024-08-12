import React, { useContext, useState } from "react";
import { UserInterface } from "../../interfaces/UserInterface";
import { Button, Modal, Table } from "react-bootstrap";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import { ReimbursementsContext } from "../../contexts/ReimbursementContext";

type Props = {
  users: UserInterface[];
};

const UsersTable = (props: Props) => {
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState({
    show: false,
    user: {} as UserInterface,
  });
  const { users, setUsers } = useContext(UsersContext);
  const { reimbursements, setReimbursements } = useContext(ReimbursementsContext);

  const handleDelete = (userId: UserInterface) => {
    setDeleteModal({ ...deleteModal, show: true, user: userId });
  };

  const confirmDelete = async () => {
    setDeleteModal({ ...deleteModal, show: false });
    const response = await fetch(
      `http://localhost:8080/users/${deleteModal.user.userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          //'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      }
    );

    if (response.ok) {
      const updatedUsers = users.filter(
        (user) => user.userId !== deleteModal.user.userId
      );
      setUsers(updatedUsers);
      // Remove any reimbursements associated with this user
      const updatedReimbursements = reimbursements.filter(
        (reimb) => reimb.userId?.userId !== deleteModal.user.userId
      );
      setReimbursements(updatedReimbursements);
      toast.success(`User ${deleteModal.user.username} deleted successfully.`);
    } else {
      toast.error(`Error deleting user ${deleteModal.user.username}.`);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, index) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.role?.roleName}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => navigate(`/users/edit/${user.userId}`)}
                  className="me-2"
                >
                  <FaPencilAlt />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(user ? user : { userId: 0 })}
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
          Are you sure you want to delete Role {deleteModal.user.username}?
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

export default UsersTable;
