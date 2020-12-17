import React, { useRef } from "react";
// Style
import { Card, Button, Form } from "react-bootstrap";
import classes from "./Signup.module.scss";

// Auth
import { useAuth } from "../../Context/AuthContext";

const Signup = () => {
  // Form fields references
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // Signup function from context
  const { signup } = useAuth;

  const handleSubmit = (e) => {
    // Prevent page from refreshing
    e.preventDefault();

    signup(emailRef.current.value, passwordRef.current.value);
  }

  return (
    <div className={classes.Signup_container}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>

            <Button className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log In
      </div>
    </div>
  );
};

export default Signup;
