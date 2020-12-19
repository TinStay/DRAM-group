import React, { useEffect } from "react";

//React Router
import { Link } from "react-router-dom";

// Style
import {
  Navbar,
  NavDropdown,
  FormControl,
  Nav,
  Form,
  Button,
} from "react-bootstrap";
import classes from "./Navbar.module.scss";
import account_icon from "../../assets/account/account_icon.png";

// Auth
import { useAuth } from "../../Context/AuthContext";

const Navigationbar = () => {
  const { currentUser, logout } = useAuth();

  let navItems = (
    <Nav className="ml-auto">
      <Link className={classes.btn_login} to="/login">
        Login
      </Link>
      <Link className={classes.btn_signup} to="/signup">
        Sign up
      </Link>
    </Nav>
  );

  if (currentUser) {
    navItems = (
      <Nav className="ml-auto ">
        <NavDropdown
          title={
            <div className="d-inline">
              <img
                className={classes.account_icon}
                src={account_icon}
                alt="account icon"
              />
              <span class="mr-1">{currentUser.email}</span>
            </div>
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Help</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => logout()}>Log out</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  }

  return (
    <Navbar className="" bg="light" expand="lg">
      <Navbar.Brand href="#home">WeFontys</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">{navItems}</Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;
