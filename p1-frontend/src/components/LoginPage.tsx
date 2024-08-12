import React, { useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

type Props = { onLogin: () => void };

const LoginPage = (props: Props) => {
  const navigate = useNavigate();

  const { user, setUser, fetchUser } = useContext(AuthContext);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetchUser()
    console.log(response);
      if (response.role != null) {
        props.onLogin();
        toast.success("Login successful");
        navigate("/dashboard");
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

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
          <Form
            className="p-4 border rounded shadow-sm bg-white"
            onSubmit={login}
          >
            <h2 className="text-center mb-4">Login</h2>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group
              controlId="rememberMe"
              className="d-flex align-items-center mb-3"
            >
              <Form.Check
                type="checkbox"
                label="Remember me"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Submit
            </Button>

            <div className="mt-3 text-center">
              Don't have an account? <a onClick={()=>navigate('/auth/register')} style={{cursor: 'pointer', color: '#0086ce'}}>Register</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
