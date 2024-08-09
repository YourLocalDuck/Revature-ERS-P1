import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

type Props = {onLogin: (email: string, password: string) => void}

const LoginPage = (props: Props) => {
    const navigate = useNavigate();

    const login = async () => {
        navigate("/dashboard")
    }

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
          <Form className="p-4 border rounded shadow-sm bg-white">
          <h2 className="text-center mb-4">Login</h2>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" className="d-flex align-items-center mb-3">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3" onClick={login}>
              Submit
            </Button>

            <div className="mt-3 text-center">
              Don't have an account? <a href="#">Register</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage