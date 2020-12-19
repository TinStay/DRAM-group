import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

// Style
import { Card, Form, Button, Alert } from "react-bootstrap";

// React Router
import { Link, useHistory } from "react-router-dom";

const Profile = () => {
  //State
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const history = useHistory();

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
