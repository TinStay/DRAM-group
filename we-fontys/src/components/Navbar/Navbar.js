import React from "react";

//React Router
import { Link } from 'react-router-dom'

// Style
import {Navbar, NavDropdown, FormControl, Nav, Form, Button, } from 'react-bootstrap';
import classes from "./Navbar.module.scss";

const Navigationbar = () => {
  return (
    <Navbar className="" bg="light" expand="lg">
      <Navbar.Brand href="#home">WeFontys</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link className={classes.Btn_login} to="/login">Login</Link>
          <Link className={classes.Btn_signup} to="/signup">Sign up</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;
