import React, { useRef, useState } from "react";
// Style
import { Card, Button, Form, Alert } from "react-bootstrap";
import classes from "./AuthForms.module.scss";

// Auth
import { useAuth } from "../../Context/AuthContext";

// React Router
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  // State
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // React router history
  const history = useHistory();

  // Form fields references
  const emailRef = useRef();
  const passwordRef = useRef();

  //  Signup function from context
  const { login } = useAuth();

  async function handleSubmit(e) {
    // Prevent page from refreshing
    e.preventDefault();

    try {
      // Reset error message if it exists before signing up
      setError("");
      setIsLoading(true);

      await login(emailRef.current.value, passwordRef.current.value);

      // Redirect to home page
      history.push("/discuss");
    } catch (error) {
      console.log("Login error: ", error);
      setError(error.message);
    }

    setIsLoading(false);
  }

  return (
    <div className={classes.form_container}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log in</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button disabled={isLoading} className="w-100 btn-purple-rounded" type="submit">
              Log In
            </Button>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot password?</Link>
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

export default Login;
