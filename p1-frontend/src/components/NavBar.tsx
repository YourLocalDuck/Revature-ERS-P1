import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-primary" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/Dashboard">Reimbursement Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <NavDropdown title="Your Account" id="collapsible-nav-dropdown">
                <Nav.Link href="#action/3.1">Profile</Nav.Link>
                <NavDropdown.Divider />
                <Nav.Link href="#action/3.2" eventKey={2}>Log out</Nav.Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar