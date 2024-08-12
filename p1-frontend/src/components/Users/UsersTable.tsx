import React, { useContext, useState } from "react";
import { UserInterface } from "../../interfaces/UserInterface";
import { Button, Table } from "react-bootstrap";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";

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
      toast.success(`User ${deleteModal.user.username} deleted successfully.`);
    } else {
      toast.error(`Error deleting user ${deleteModal.user.username}.`);
    }
  };

  return (
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
                onClick={() =>
                    navigate(
                      `/users/edit/${user.userId}`,
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
                      user
                        ? user
                        : { userId: 0 }
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
  );
};

export default UsersTable;
