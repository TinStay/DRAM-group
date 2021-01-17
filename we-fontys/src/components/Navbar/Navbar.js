import React, { useEffect, useState, useMemo } from "react";
import axios from "../../axios";
import { db } from "../../firebase";

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
import Searchbar from "./Searchbar";

const Navigationbar = () => {
  const { currentUser, logout } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (currentUser) {
      // let userDataRef = db.ref(`/users/${currentUser.uid}`);

      // let newUserData = [];
      // userDataRef.on("value", function (data) {
      //   data.forEach(function (childSnapshot) {
      //     var key = childSnapshot.key;
      //     var userData = childSnapshot.val();

      //     newUserData.push({ [key]: userData });
      //   });

      //   // console.log("newUserData",newUserData)

      //   // data.key, data.val().title, data.val().description
      // });
      // setUserData(newUserData);

      axios
        .get(`/users/${currentUser.uid}.json`)
        .then((userData) => {
          // Set user data state
          setUserData(userData.data);
        })
        .catch((err) => {
          console.log("Error in fetching data from Firebase", err);
        });
    }
  }, [currentUser]);

  // console.log("userData", userData);

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
      <Nav className="d-flex justify-content-end w-100 ">
        <Link
          onClick={() => setExpanded(false)}
          className="text-decoration-none gray-font h5 my-2 mr-3"
          to="/discuss"
        >
          Discuss
        </Link>
        <div className="my-auto">
          <Searchbar />
        </div>

        <NavDropdown
          title={
            <div className="d-inline ">
              <img
                className={classes.account_icon}
                src={
                  userData
                    ? userData.photoURL !== ""
                      ? userData.photoURL
                      : account_icon
                    : account_icon
                }
                alt="account icon"
                width="45px"
                height="45px"
              />
              <span className="mr-1">
                {userData ? userData.username : "Profile"}
              </span>
            </div>
          }
          id="basic-nav-dropdown"
        >
          <Link
            onClick={() => setExpanded(false)}
            className="dropdown-item"
            to={`/profile/` + currentUser.uid}
          >
            Profile
          </Link>
          <NavDropdown.Divider />
          <div className="ml-2">
            <Button className="btn-danger btn-cancel" onClick={() => logout()}>
              Log out
            </Button>
          </div>
        </NavDropdown>
      </Nav>
    );
  }

  return (
    <Navbar expanded={expanded} className={classes.navbar} expand="lg">
      {/* <div
        className="mx-auto d-md-flex justify-content-between"
        style={{ width: "88vw" }}
      > */}
      <Link className={classes.logo} to="/">
        WeFontys
      </Link>

      <Navbar.Toggle
        className="text-right"
        onClick={() => setExpanded(expanded ? false : "expanded")}
        className={""}
        aria-controls="basic-navbar-nav"
      />

      <Navbar.Collapse className="mx-2 " id="basic-navbar-nav">
        {navItems}
      </Navbar.Collapse>

      {/* </div> */}
    </Navbar>
  );
};

export default React.memo(Navigationbar);
