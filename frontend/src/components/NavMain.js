import React, { Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { userLogoutAction } from '../actions/userActions';
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavMain = () => {

  const { userInfo } = useSelector(state => state.userLogin)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(userLogoutAction())
  }

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
            {userInfo ? (
              <NavDropdown title={userInfo.name.toUpperCase()} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) :
              <Nav><LinkContainer to="/login">
                <Nav.Link>LOGIN</Nav.Link>
              </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>SIGN UP</Nav.Link>
                </LinkContainer>
              </Nav>
            }

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/cakelist">
                  <NavDropdown.Item>Cakes</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )
            }
          </Nav>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavMain;
