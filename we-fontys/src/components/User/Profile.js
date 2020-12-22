import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "../../axios";
import account_icon from '../../assets/account/account_icon_purple.png';
// Style
import { Card, Form, Button, Alert } from "react-bootstrap";
import classes from "./Profile.module.scss";

// React Router
import { Link, useHistory } from "react-router-dom";



const Profile = () => {
  //State
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const [userData, setUserData] = useState();

  const history = useHistory();

  // Request user data from Firebase Realtime Database
  useEffect(() => {
    axios
      .get(`/users/${currentUser.uid}.json`)
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

  return (
    <div className={classes.profile_container}>
      <Card>
        <Card.Body>
          {/* <h2 className="text-center mb-4">Profile</h2> */}

          {error && <Alert variant="danger">{error}</Alert>}

          <div className="w-100">
            <div className="my-3 text-center">
              <img className={classes.account_image_main} src={account_icon}></img>
            </div>
            <div className="my-3">
              <strong>Email: </strong>
              {userData && userData.email}
            </div>
            <div className="my-3">
              <strong>Name: </strong>
              {userData && userData.firstName + " " + userData.lastName}
            </div>
            <div className="my-3">
              <strong>Userame: </strong>
              {userData && userData.username}
            </div>
            <div className="my-3">
              <strong>Nationality: </strong>
              {userData && userData.nationality}
            </div>
            <div className="my-3">
              <strong>City: </strong>
              {userData && userData.city}
            </div>
            <div className="my-3">
              <strong>Study program: </strong>
              {userData && userData.studyProgram}
            </div>
            <div className="my-3">
              <strong>Interests: </strong>
              <div className="w-100 mx-auto my-3 row text-center">
                {(userData && userData.interests )
                  ? userData.interests.map((interest) => (
                      <div
                        key={interest}
                        className="interest-container col-3 px-1"
                      >
                        <p key={interest} className={classes.interest_box}>
                          {interest}
                        </p>
                      </div>
                    ))
                  : <p className="text-muted">You haven't selected any interests yet.</p> }
              </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <Link
                to="update-profile"
                className="btn-purple-rounded text-decoration-none white mr-5"
              >
                Update profile 
              </Link>
              <Button
                variant="danger"
                onClick={handleLogout}
                className="btn btn-danger"
              >
                Logout
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
