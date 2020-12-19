import React, { useRef, useState } from "react";
// Style
import { Card, Button, Form, Alert } from "react-bootstrap";
import classes from "./AuthForms.module.scss";

// Auth
import { useAuth } from "../../Context/AuthContext";

// React Router
import { Link, useHistory } from "react-router-dom";

const UpdateProfile = () => {
  // State
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // React router history
  const history = useHistory();

  // Form fields references
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // Signup function from context
  const { currentUser, updateEmail, updatePassword } = useAuth();

  const handleSubmit = (e) => {
    // Prevent page from refreshing
    e.preventDefault();

    // Validate form
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      // Set an error and exit out of function
      return setError("Passwords do not match");
    }

    // Reset error message if it exists before signing up
    setError("");
    setIsLoading(true);

    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
        promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    if(promises.length > 0){
        Promise.all(promises).then(() => {
            // Redirect to home page if all promises are successful
            
            history.push("/profile");
          })
          .catch((error) => {
            console.log("Update profile error: ", error);
            setError("Failed to update profile");
          })
          .finally(() => {
            setIsLoading(false);
          });
    }else{
        setError("No changes we detected")
        setIsLoading(false)
    }
  }

  return (
    <div className={classes.form_container}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update profile</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={currentUser.email}
                ref={emailRef}
                required
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>

            <Button
              disabled={isLoading}
              className="btn-purple-rounded w-100 mb-3"
              type="submit"
            >
              Update
            </Button>

            <Link to="/profile" className="btn btn-danger w-100 " type="submit">
              Cancel
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateProfile;
