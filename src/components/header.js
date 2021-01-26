import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
  <Navbar.Brand>Clickup Media</Navbar.Brand>
  </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
        <LinkContainer to="/stores">
      <Nav.Link>Store</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/categories">
      <Nav.Link>Category</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/products">
      <Nav.Link>Product</Nav.Link>
      </LinkContainer>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}

export default header
