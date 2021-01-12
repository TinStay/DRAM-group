import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "../../axios";
import account_icon from "../../assets/account/account_icon_purple.png";
// Style
import { Card, Form, Button, Alert } from "react-bootstrap";
import classes from "./Profile.module.scss";

// React Router
import { Link, useHistory } from "react-router-dom";

const Profile = (props) => {
  //State
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const [userData, setUserData] = useState();

  const history = useHistory();

  // Update user data from Firebase Realtime Database
  useEffect(() => {
    axios
      .get(`/users/${props.match.params.id}.json`)
      .then((userData) => {
        // Set user data state
        setUserData(userData.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  async function handleLogout() {
    // Clear existing error
    setError("");

    try {
      await logout();

      // Redirect to home page
      history.push("/");
    } catch (error) {
      setError(error);
    }
  }

  let accountImageClasses = ["rounded-circle ", classes.account_image_main];

  return (
    <div className={classes.profile_container}>
      <Link className="text-decoration-none " to="/discuss">
        <i className="fas fa-angle-left mr-1"></i>Back
      </Link>
      <Card>
        <Card.Body>
          {/* <h2 className="text-center mb-4">Profile</h2> */}

          {error && <Alert variant="danger">{error}</Alert>}

          <div className="row">
            <div class="col-md-4 text-center">
              <div className="my-3 ">
                <img
                  className={accountImageClasses.join(" ")}
                  src={userData ? userData.photoURL : account_icon}
                ></img>
              </div>
              <div className="my-2">
                {/* <strong>Email: </strong> */}
                {userData && userData.email}
              </div>
              <div className="my-2">
                {/* <strong>Name: </strong> */}
                {userData && userData.firstName + " " + userData.lastName}
              </div>
              <div className="my-4 ">
                <Link
                  to={`/profile/${props.match.params.id}/update-profile`}
                  className="btn-purple-rounded text-decoration-none white"
                >
                  Update profile
                </Link>
              </div>
            </div>
            <div class="col-md-8 mx-auto">
              <div className="my-4">
                <strong>Userame: </strong>
                {userData && userData.username}
              </div>
              <div className="my-4">
                <strong>Nationality: </strong>
                {userData && userData.nationality}
              </div>
              <div className="my-4">
                <strong>City: </strong>
                {userData && userData.city}
              </div>
              <div className="my-3">
                <strong>Study program: </strong>
                {userData && userData.studyProgram}
              </div>
              <div className="my-4">
                <strong>Interests: </strong>
                <div className="w-100 mx-auto my-3 row text-center">
                  {userData && userData.interests ? (
                    userData.interests.map((interest) => (
                      <div
                        key={interest}
                        className="interest-container col-6 col-xl-4  px-1"
                      >
                        <p key={interest} className={classes.interest_box}>
                          {interest}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">
                      You haven't selected any interests yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div class="col-12">
              {props.match.params.id === currentUser.uid ? (
                <div className="d-flex float-right mt-4">
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    className="btn btn-danger"
                  >
                    Logout
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
