import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";

// Style
import { Card, Form, Button, Alert } from "react-bootstrap";

// React Router
import { Link, useHistory } from "react-router-dom";

import axios from 'axios'

const Profile = () => {
  //State
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const history = useHistory();

  useEffect(() => {
    axios.get("https://wefontys-default-rtdb.europe-west1.firebasedatabase.app/").then(
      (response) => {
        console.log("response",response)
      }
    ).catch((err) => {
      console.log("err", err)
    })
  }, [])

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
    <div className="">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <div>
            <strong>Email: </strong>
            {currentUser.email}

            <div className="text-center">
              <Link to="update-profile" className="btn-purple-rounded text-decoration-none white mr-5">
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
