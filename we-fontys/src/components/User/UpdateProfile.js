import React, { useRef, useState, useEffect } from "react";
import axios from "../../axios";
import account_image from "../../assets/account/account_icon_purple.png";
import { storage } from "../../firebase";

// Style
import {
  Card,
  Button,
  Form,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import classes from "./Profile.module.scss";

// Auth
import { useAuth } from "../../Context/AuthContext";

// React Router
import { Link, useHistory } from "react-router-dom";

const UpdateProfile = () => {
  // State
  const [userData, setUserData] = useState();
  const [profileImagePreview, setProfileImagePreview] = useState();
  const [profileImageFile, setProfileImageFile] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // React router history
  const history = useHistory();

  // Form fields references
  const usernameRef = useRef();
  // const emailRef = useRef();
  const nationalityRef = useRef();
  const cityRef = useRef();
  const studyProgramRef = useRef();
  const interestRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // Signup function from context
  const { currentUser, updateEmail, updatePassword } = useAuth();

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

  const addInterest = (e) => {
    const newInterest = interestRef.current.value;
    // Copy array from firebase or create an empty one if there isnt one in firebase
    let newInterestsArray =
      userData.interests !== "" ? [...userData.interests] : [];

    if (newInterest !== "") {
      if (!newInterestsArray.includes(newInterest)) {
        let newUserData = { ...userData };

        // Add interest to all interests
        newInterestsArray.push(newInterest);

        // Update interests in userData
        newUserData.interests = newInterestsArray;

        // Update state with new interests
        setUserData(newUserData);

        // Reset form
        interestRef.current.value = "";
      } else {
        setError("Interest already exists in your interest list");
        console.log("Interest already exists in your interest list");
      }
    } else {
      setError("Interest must be at least 2 letters");
      console.log("Interest must be at least 2 letters");
    }
  };

  const removeInterest = (e, index) => {
    let newUserData = { ...userData };

    // Remove interest from array
    newUserData.interests.splice(index, 1);

    // Change interest array to string so Firebase doesn't remove field from Realtime Database
    // When a field is null or [] Firebase removes it
    if (newUserData.interests.length === 0) {
      newUserData.interests = "";
    }

    // Update user data
    setUserData(newUserData);
  };

  // Profile image file
  let fileInput = null;

  const uploadNewImage = (event) => {
    // Save image file as a URL in order to preview the image
    const imagePreviewURL = URL.createObjectURL(event.target.files[0]);

    // Update state with preview image file URL
    setProfileImagePreview(imagePreviewURL);

    // Update profile image file state
    setProfileImageFile(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    // Prevent page from refreshing
    e.preventDefault();

    // Updated user data
    let newUserData = { ...userData };
    newUserData.username = usernameRef.current.value;
    newUserData.nationality = nationalityRef.current.value;
    newUserData.city = cityRef.current.value;
    newUserData.studyProgram = studyProgramRef.current.value;
    // Don't need to add interests because they are added and
    // removed to userData on form change

    // Validate form
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      // Set an error and exit out of function
      return setError("Passwords do not match");
    }

    // Reset error message if it exists before signing up
    setError("");
    setIsLoading(true);

    const promises = [];

    // Update email
    // if (emailRef.current.value !== currentUser.email) {
    //   promises.push(updateEmail(emailRef.current.value));
    // }

    // Handle profile image file upload to Firebase Storage
    



    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    // Update other user data
    promises.push(axios.put(`users/${currentUser.uid}.json`, newUserData));

    if (promises.length > 0) {
      Promise.all(promises)
        .then(() => {
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
    } else {
      setError("No changes we detected");
      setIsLoading(false);
    }
  };

  // console.log("profile image",profileImagePreview)

  let accountImageClasses = ["rounded-circle", classes.account_image_main];

  return (
    <div className={classes.form_container}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update profile</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <div className="my-3 text-center">
            <img
              className={accountImageClasses.join(" ")}
              src={profileImagePreview ? profileImagePreview : account_image}
              alt="account image"
            ></img>
            <input
              name="image"
              style={{ display: "none" }}
              type="file"
              onChange={uploadNewImage}
              ref={(input) => {
                fileInput = input;
              }}
            />
            <Button
              onClick={() => fileInput.click()}
              className="my-4"
              variant="primary"
            >
              Select new image
            </Button>
          </div>
          <p className="text-muted">
            Leave blank the fields which you don't want to change
          </p>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userData && userData.username}
                ref={usernameRef}
              />
            </Form.Group>

            {/* <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={currentUser.email}
                ref={emailRef}
                required
              />
            </Form.Group> */}

            <Form.Group id="nationality">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userData ? userData.nationality : ""}
                ref={nationalityRef}
              />
            </Form.Group>

            <Form.Group id="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userData ? userData.city : ""}
                ref={cityRef}
              />
            </Form.Group>

            <Form.Group id="studyProgram">
              <Form.Label>Study program</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userData ? userData.studyProgram : ""}
                ref={studyProgramRef}
              />
            </Form.Group>

            <Form.Group id="interests">
              <Form.Label>Interests</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Add interest"
                  aria-label="interest"
                  aria-describedby="basic-addon2"
                  ref={interestRef}
                />
                <InputGroup.Append>
                  <Button onClick={(e) => addInterest(e)} variant="primary">
                    Add
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <div className="w-100 mx-auto row text-center">
                {userData && userData.interests !== ""
                  ? userData.interests.map((interest, index) => {
                      return (
                        <div
                          key={interest}
                          onClick={(e) => removeInterest(e, index)}
                          className="interest-container col-4 px-1"
                        >
                          <p className="interest-box">{interest}</p>
                        </div>
                      );
                    })
                  : null}
              </div>
            </Form.Group>

            {/* <Form.Group id="interests">
              <Form.Label>Interests</Form.Label>
              <Form.Control
                type="text"

                // defaultValue={currentUser.email}
              />
              
            </Form.Group> */}

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} />
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