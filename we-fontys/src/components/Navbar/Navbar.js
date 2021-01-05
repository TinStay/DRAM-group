import React, { useEffect, useState } from "react";

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
import account_icon from "../../assets/account/account_icon_purple.png";

// Auth
import { useAuth } from "../../Context/AuthContext";

const Navigationbar = () => {
  const { currentUser, logout } = useAuth();
  const [expanded, setExpanded] = useState(false);

  let togglerClasses = [];
  let collapseClasses = [];

  let navItems = (
    <Nav className="ml-auto">
      <Link
        onClick={() => setExpanded(false)}
        className={classes.btn_login}
        to="/login"
      >
        Login
      </Link>
      <Link
        onClick={() => setExpanded(false)}
        className={classes.btn_signup}
        to="/signup"
      >
        Sign up
      </Link>
    </Nav>
  );

  if (currentUser) {
    navItems = (
      <Nav className="ml-auto ">
        <Link
            onClick={() => setExpanded(false)}
            className="nav-link"
            to="/discuss"
          >
            Discuss
          </Link>
        <NavDropdown
          title={
            <div className="d-inline ">
              <img
                className={classes.account_icon}
                src={account_icon}
                alt="account icon"
              />
              <span className="mr-1">{currentUser.email}</span>
            </div>
          }
          id="basic-nav-dropdown"
        >
          <Link
            onClick={() => setExpanded(false)}
            className="dropdown-item"
            to="/profile"
          >
            Profile
          </Link>
          <Link
            onClick={() => setExpanded(false)}
            className="dropdown-item"
            to="/"
          >
            Help
          </Link>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => logout()}>Log out</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  }

  return (
    <Navbar expanded={expanded} className="" bg="light" expand="lg">
      <Link className={classes.logo} to="/">
        WeFontys
      </Link>
      <Navbar.Toggle
        onClick={() => setExpanded(expanded ? false : "expanded")}
        className={togglerClasses.join(" ")}
        aria-controls="basic-navbar-nav"
      />
      <Navbar.Collapse
        className={collapseClasses.join(" ")}
        id="basic-navbar-nav"
      >
        {navItems}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;
