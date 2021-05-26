import React, { Fragment } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavMain = () => {
  return (
    <Fragment>
      <Navbar bg="secondary" variant="dark" className="mb-4">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="fas fa-birthday-cake mr-3 fa-2x"></i>
              <strong>Delicious</strong> Cakes
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <Nav.Link>CART</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>LOGIN</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Nav.Link>SIGN UP</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavMain;
