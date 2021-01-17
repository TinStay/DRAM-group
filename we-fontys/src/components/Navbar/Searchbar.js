import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./Navbar.module.scss";
import default_image from "../../assets/account/account_icon_purple.png";
import { Form, ListGroup } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import axios from "../../axios";
// import onClickOutside from "react-onclickoutside";

function Searchbar() {
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [inputText, setInputText] = useState("");
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`/users.json`)
        .then((response) => {
          let newOptions = [];

          const usersData = response.data;

          for (let user in usersData) {
            // Save username to display in serachbar and user ID to redirect to users profile page
            let optionData = {
              userID: usersData[user]["userID"],
              username: usersData[user]["username"],
              photoURL: usersData[user]["photoURL"],
            };

            // Push to options list
            newOptions.push(optionData);
          }

          // Set option data state
          setOptions(newOptions);
        })
        .catch((err) => {
          console.log("Error in fetching data from Firebase", err);
        });
    }
  }, []);

  let filteredOptions = [];
  if (inputText !== "") {
    filteredOptions = options.filter((option) =>
      option.username.includes(inputText)
    );
  }

  let listGroupClasses = [
    "mx-3 z-index-10 position-absolute ",
    classes.options_container,
  ];

  return (
    <div className={classes.searchbar_container}>
      <Form.Group
        onClick={() => setShowOptions(true)}
        className="mx-0 my-2 my-lg-auto "
        controlId="searchbar"
      >
        <Form.Control
          onChange={(e) => setInputText(e.target.value)}
          className="border-rounded"
          value={inputText}
          onFocus={() => setShowOptions(true)}
          onBlur={() => setShowOptions(false)}
          type="text"
          placeholder="Search users"
        />
      </Form.Group>
      {showOptions && (
        <ListGroup className={listGroupClasses.join(" ")} as="ul">
          {inputText !== "" ? (
            filteredOptions.length !== 0 ? (
              filteredOptions.map((option, index) => {
                return (
                  <Link
                    to={`/profile/${option.userID}`}
                    onClick={() => {
                      setShowOptions(false);
                    }}
                    onMouseDown={() =>
                      history.push(`/profile/${option.userID}`)
                    }
                    className="text-decoration-none black-text"
                    key={index}
                  >
                    <ListGroup.Item
                      action
                      as="li"
                      className={classes.option_item}
                    >
                      <img
                        src={
                          option.photoURL != ""
                            ? option.photoURL
                            : default_image
                        }
                        className={classes.account_icon_searchbar}
                        alt="profile image"
                      />
                      {option.username}
                    </ListGroup.Item>
                  </Link>
                );
              })
            ) : (
              <ListGroup.Item action as="li" className={classes.option_item}>
                <p className="my-auto">No users found</p>
              </ListGroup.Item>
            )
          ) : null}
        </ListGroup>
      )}
    </div>
  );
}

// const clickOutsideConfig = {
//   handleClickOutside: () => Searchbar.handleClickOutside,
// };

export default Searchbar;
