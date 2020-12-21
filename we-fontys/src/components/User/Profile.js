import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";

// Style
import { Card, Form, Button, Alert } from "react-bootstrap";
import classes from './Profile.module.scss';

// React Router
import { Link, useHistory } from "react-router-dom";

import axios from "../../axios";

const Profile = () => {
  //State
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const [userData, setUserData] = useState();

  const history = useHistory();

  useEffect(() => {
    axios.get(`/users/${currentUser.uid}.json`)
      .then((userData) => {
        
        setUserData(userData.data)
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  console.log("userData", userData);

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
          <h2 className="text-center mb-4">Profile</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <div>
            <div className="my-3">
              <strong>Name: </strong>
              {userData && userData.firstName + " " + userData.lastName}
            </div>
            <div className="my-3">
              <strong>Nationality: </strong>
              {userData && userData.nationality}
            </div>
            <div className="my-3">
              <strong>Email: </strong>
              {userData && userData.email}
            </div>
            <div className="my-3">
              <strong>City: </strong>
              {userData && userData.city}
            </div>
            <div className="my-3">
              <strong>Study program: </strong>
              {userData && userData.study}
            </div>
            <div className="my-3">
              <strong>Interests: </strong>
              {userData && userData.interests.map(interest => (
                <span key={interest} className={classes.interest_box}>{interest}</span>
              ))}
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
