import React, { useRef, useState } from "react";
// Style
import { Card, Button, Form, Alert } from "react-bootstrap";
import classes from "./Signup.module.scss";

// Auth
import { useAuth } from "../../Context/AuthContext";

const Signup = () => {
  // State
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form fields references
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // Signup function from context
  const { signup } = useAuth;

  async function handleSubmit(e){
    // Prevent page from refreshing
    e.preventDefault();

    // Validate form
    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      // Set an error and exit out of function
      return setError("Passwords do not match")
    }

    try{
      // Reset error message if it exists before signing up 
      setError("")
      setIsLoading(true)

      await signup(emailRef.current.value, passwordRef.current.value);
    } catch{
      setError("Failed to sign up")
    }

    setIsLoading(false)
  }

  return (
    <div className={classes.Signup_container}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>

          {error && <Alert variant="danger">{error}</Alert> }

          <Form onSubmit={(e) => handleSubmit(e)}>
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

            <Button disabled={isLoading} className="w-100" type="submit">
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
