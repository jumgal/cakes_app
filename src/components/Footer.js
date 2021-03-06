import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar bg="light" variant="dark" fixed="bottom" className="ml">
      <Nav className="m-auto">
        <p>Copyright &copy; Delicious Cakes</p>
      </Nav>
    </Navbar>
  );
};

export default Footer;
