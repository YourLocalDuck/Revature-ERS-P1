import React, { useContext, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { UserInterface } from "../../interfaces/UserInterface";
import toast from "react-hot-toast";
import { Form, Row, Col, Button } from "react-bootstrap";
import { UsersContext } from "../../contexts/UserContext";
import { RolesContext } from "../../contexts/RolesContext";

type Props = {};

const AddUpdateUsers = (props: Props) => {
  // Get the id from the URL
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();

  // Get the global state from the context for users and roles
  const { users, setUsers, fetchUsers } = useContext(UsersContext);
  const { roles, setRoles, fetchRoles } = useContext(RolesContext);

  // Current form state
  const [user, setUser] = React.useState<any>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    roleId: undefined,
  });

  useEffect(() => {
    getRoles();
    patchValues();
  }, []);

  const navigate = useNavigate();

  const getRoles = async () => {
    if (roles.length === 0) {
      fetchRoles();
    }
  };

  const patchValues = () => {
    if (id) {
      const curUser = users.find((r) => r.userId === +id);
      if (curUser) {
        setUser({
          ...curUser,
          roleId: curUser.role?.roleId,
        });
      }
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = event.target;
    setUser((prevUser: any) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reqUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      roleId: user.roleId,
    };

    if (id) {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(reqUser),
      })
        .then((response) => response.json())
        .then((json: UserInterface) => {
          const index = users.findIndex((r) => r.userId === +id);
          if (index !== -1) {
            const updatedReimbursements = [
              ...users.slice(0, index),
              json,
              ...users.slice(index + 1),
            ];
            setUsers(updatedReimbursements);
          }
          toast.success(`User ${json.username} updated successfully`);
          navigate("/users");
        })
        .catch((error) => {
          toast.error(`Error updating user ${user.username}`);
          console.log(error);
        });
    } else {
      const response = await fetch("http://localhost:8080/users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(reqUser),
      })
        .then((response) => response.json())
        .then((json: UserInterface) => {
          setUsers([json, ...users]);
          toast.success(`User ${json.username} added successfully`);
          navigate("/users");
        })
        .catch((error) => {
          console.log(error);
          toast.error(`Error adding reimbursement + ${user.username}`);
        });
    }
  };

  return (
    <div>
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
          <div className="p-5 border rounded shadow-sm bg-white">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  defaultValue={user?.firstName}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  defaultValue={user?.lastName}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  defaultValue={user?.username}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  defaultValue={user?.password}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="roleId">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  aria-label="role"
                  value={user?.roleId}
                  onChange={(e) => handleChange(e)}
                >
                  <option>Select Role</option>
                  {roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <br></br>
              <div className="d-flex justify-content-end">
                <Button type="submit" className="btn-lg btn-primary">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddUpdateUsers;
