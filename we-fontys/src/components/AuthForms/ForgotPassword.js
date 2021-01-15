import React, { useRef, useState } from "react";
// Style
import { Card, Button, Form, Alert } from "react-bootstrap";
import classes from "./AuthForms.module.scss";

// Auth
import { useAuth } from "../../Context/AuthContext";

// React Router
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  // State
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form fields references
  const emailRef = useRef();

  //  Reset password function from context
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    // Prevent page from refreshing
    e.preventDefault();

    try {
      // Reset error and message if it exists before signing up
      setError("");
      setMessage("")

      setIsLoading(true);

      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions")

    } catch (error) {
      console.log("Reset password error: ", error);
      setError(error.message);
    }

    setIsLoading(false);
  }

  return (
    <div className={classes.form_container}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset password</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button disabled={isLoading} className="w-100 btn-purple-rounded" type="submit">
              Submit 
            </Button>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
