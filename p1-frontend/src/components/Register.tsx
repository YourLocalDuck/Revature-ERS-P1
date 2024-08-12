import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import toast from "react-hot-toast";
import { RolesContext } from "../contexts/RolesContext";
import { UsersContext } from "../contexts/UserContext";
import { UserInterface } from "../interfaces/UserInterface";

type Props = {};

const Register = (props: Props) => {
  const navigate = useNavigate();

  const { users, setUsers } = useContext(UsersContext);
  const { roles, fetchRoles } = useContext(RolesContext);

  const [user, setUser] = useState<any>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    roleId: undefined,
  });

  useEffect(() => {
    if (roles.length === 0) {
      fetchRoles();
    }
  }, [roles, fetchRoles]);

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
      email: user.email,
      roleId: user.roleId,
    };

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
        toast.success(`User ${json.username} registered successfully`);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Error registering user ${user.username}`);
      });
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
          <div className="p-5 border rounded shadow-sm bg-white">
          <Button variant="primary" onClick={() => navigate("/login")} >Back</Button>
            <Form onSubmit={handleSubmit}>
              <h2 className="text-center mb-4">Register Here</h2>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={user.firstName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={user.lastName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={user.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={user.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={user.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="roleId">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={user.roleId}
                  onChange={handleChange}
                >
                  <option value="">Select role</option>
                  {roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Register
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
