import React from "react";

// Style
import {Navbar, NavDropdown, FormControl, Nav, Form, Button, } from 'react-bootstrap';
import classes from "./Navbar.module.scss";

const Navigationbar = () => {
  return (
    <Navbar className="" bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#home"><p className={classes.Btn_login}>Login</p></Nav.Link>
          <Nav.Link href="#link"><p className={classes.Btn_signup}>Sign up</p></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;
