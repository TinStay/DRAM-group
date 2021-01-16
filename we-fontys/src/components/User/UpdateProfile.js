import React, { useRef, useState, useEffect } from "react";
import axios from "../../axios";
import account_image from "../../assets/account/account_icon_purple.png";
import { objectsAreTheSame } from "../../shared/sharedFunctions";
import { storage } from "../../firebase";

import Select from "react-select";

// Style
import {
  Card,
  Button,
  Form,
  Alert,
  InputGroup,
  FormControl,
  Spinner,
} from "react-bootstrap";
import classes from "./Profile.module.scss";

// Auth
import { useAuth } from "../../Context/AuthContext";

// React Router
import { Link, useHistory } from "react-router-dom";

const UpdateProfile = (props) => {
  // State
  const [userData, setUserData] = useState();
  const [profileImageFile, setProfileImageFile] = useState();
  const [profileImagePreview, setProfileImagePreview] = useState();
  const [studyLocation, setStudyLocation] = useState("");
  const [studyProgram, setStudyProgram] = useState("");
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interestInputValue, setInterestInputValue] = useState("");

  // React router history
  const history = useHistory();

  // Form fields references
  const nameRef = useRef();
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

        // Update local state with Firebase data
        setStudyProgram(userData.data.studyProgram);
        setStudyLocation(userData.data.city);
        setInterests(userData.data.interests);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  console.log("input",interestInputValue)

  const addInterest = (e) => {
    const newInterest = interestRef.current.state.value !== null ? interestRef.current.state.value.value : interestInputValue;
    
    
    console.log(newInterest)

    // Copy array from firebase or create an empty one if there isnt one in firebase
    let newInterestsArray = interests !== "" ? [...interests] : [];

    if (newInterest.length > 1) {
      if (!newInterestsArray.includes(newInterest)) {
        // Add interest to all interests
        newInterestsArray.push(newInterest);

        // Update state with new interests
        setInterests(newInterestsArray);

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
    let updatedInterests = [...interests];

    // Remove interest from array
    updatedInterests.splice(index, 1);

    // Change interest array to string if there are no interests so Firebase doesn't remove field from Realtime Database
    // When a field is null or [] Firebase removes it
    if (updatedInterests.length === 0) {
      updatedInterests = "";
    }

    // Update new interests state
    setInterests(updatedInterests);
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

  async function handleSubmit(e) {
    // Prevent page from refreshing
    e.preventDefault();

    // Reset error message if it exists before signing up
    setError("");
    setIsLoading(true);

    // New form values
    const newFirstName = nameRef.current.value.split(" ")[0];
    const newLastName = nameRef.current.value.split(" ")[1];
    const newUsername = usernameRef.current.value;
    const newNationality = nationalityRef.current.value;
    const newCity = cityRef.current.value;
    const newStudyProgram = studyProgramRef.current.value;

    // Validate form
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setIsLoading(false);
      // Set an error and exit out of function
      return setError("Passwords do not match");
    }

    // Promises list that will be executed
    const promises = [];

    if (profileImageFile) {
      // Update user data when new image has been uploaded to Firebase Storage
      // console.log("Update with image");

      // Handle profile image file upload to Firebase Storage
      const uploadTask = storage
        .ref(
          `users/${currentUser.email}/profile-image/${profileImageFile.name}`
        )
        .put(profileImageFile);

      // Push upload of image to promises list
      // promises.push(uploadTask)

      await uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("Uploading image...");
        },
        (error) => {
          // Error function ...
          console.log("Uploading image error: ", error);
        },
        function () {
          // Complete function ...
          storage
            .ref(`users/${currentUser.email}`)
            .child(`/profile-image/${profileImageFile.name}`)
            .getDownloadURL()
            .then((url) => {
              // Set new data with image URL which is going to be uploaded to Firebase Reatime Database
              let newUserData = { ...userData };

              // Add new values to object
              newUserData.firstName = newFirstName;
              newUserData.lastName = newLastName;
              newUserData.photoURL = url;
              newUserData.username = newUsername;
              newUserData.nationality = newNationality;
              newUserData.city = newCity;
              newUserData.studyProgram = newStudyProgram;
              newUserData.interests = interests;

              // Add user data update to promises that will be executed
              promises.push(
                axios.put(`users/${currentUser.uid}.json`, newUserData)
              );
            });

          // console.log("Uploaded image");
        }
      );
    } else {
      // Update user data without updating photoURL field
      // console.log("Update without image");

      // Duplicate userData
      let newUserData = { ...userData };

      // Add new values to object
      newUserData.firstName = newFirstName;
      newUserData.lastName = newLastName;
      newUserData.username = newUsername;
      newUserData.nationality = newNationality;
      newUserData.city = newCity;
      newUserData.studyProgram = newStudyProgram;
      newUserData.interests = interests;

      // newUserData.photoURL = profileImageURL;
      // Don't need to add interests because they are added and
      // removed to userData on form change

      // Validate if any field been changed
      if (objectsAreTheSame(userData, newUserData)) {
        // exit function and don't push to promises list
        // console.log("Objects are the same ");
      } else {
        // Update other user data
        promises.push(axios.put(`users/${currentUser.uid}.json`, newUserData));
      }
    }

    // Update email
    // if (emailRef.current.value !== currentUser.email) {
    //   promises.push(updateEmail(emailRef.current.value));
    // }

    // Update password
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        // Redirect to home page if all promises are successful
        history.push("/profile/" + props.match.params.id);
      })
      .catch((error) => {
        console.log("Update profile error: ", error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setIsLoading(false);
  }

  let accountImageClasses = [
    "rounded-circle d-block mx-auto",
    classes.account_image_main,
  ];

  const studyLocations = ["Eindhoven", "Venlo", "Tilburg"];
  const studyPrograms = [
    "Finance & Control",
    "International Business",
    "Logistics Management",
    "Marketing Management",
    "Business Administration",
    "Business and Management",
    "International Logistics and Supply Chain Management",
    "International Procurement and Supply Chain Management",
    "International Communications Management",
    "Operations and Supply Chain Management",
    "Automotive Engineering",
    "Electrical and Electronic Engineering",
    "Industrial Design Engineering",
    "Industrial Engineering and Management ",
    "Mechatronics",
    "ICT & Software Engineering",
    "ICT & Media Design",
    "ICT & Technology",
    "ICT & Business",
    "ICT & Infrastructure",
    "Academy of Music and Performing Arts",
    "Circus and Performance Art",
    "Dance Academy",
    "Architecture",
    "Choreography",
    "Master of Music",
    "Performing Public Space",
    "Urbanism",
    "Master Care & Technology",
    "Trend Research & Concept Creation in Lifestyle",
    "Medical Imaging and Radiation Therapy",
    "Physiotherapy",
  ];

  const interestList = [
    "COVID-19",
    "Arts",
    "Communications",
    "Business",
    "Engineering",
    "Healthcare",
    "ICT",
    "Logistics",
    "International",
    "Intership",
  ];

  let interestsArray = interestList.map((interest) => {
    // return {...interest, label: interest}
    return { value: interest, label: interest };
  });


  return (
    <div className={classes.form_container}>
      <Link
        className="text-decoration-none "
        to={`/profile/${currentUser.uid}`}
      >
        <i className="fas fa-angle-left mr-1 mb-3"></i>Back
      </Link>
      <Card>
        <Card.Body>
          <div class="row">
            <div class="col-md-4 text-center">
              <div className="my-3 text-center">
                <img
                  className={accountImageClasses.join(" ")}
                  src={
                    profileImagePreview
                      ? profileImagePreview
                      : userData
                      ? userData.photoURL !== ""
                        ? userData.photoURL
                        : account_image
                      : account_image
                  }
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
                  className="my-4 btn-purple-rounded"
                >
                  Select new image
                </Button>
              </div>
            </div>
            <div class="col-md-8 ">
              <h2 className=" mb-4">Update profile</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={
                      userData && `${userData.firstName} ${userData.lastName}`
                    }
                    ref={nameRef}
                  />
                </Form.Group>

                <Form.Group id="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={userData && userData.username}
                    ref={usernameRef}
                  />
                </Form.Group>

                <Form.Group id="nationality">
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={userData ? userData.nationality : ""}
                    ref={nationalityRef}
                  />
                </Form.Group>

                {/* <Form.Group id="studyProgram">
                  <Form.Label>Study program</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={userData ? userData.studyProgram : ""}
                    ref={studyProgramRef}
                  />
                </Form.Group> */}

                <Form.Group controlId="studyProgram">
                  <Form.Label>Study program</Form.Label>
                  <Form.Control
                    as="select"
                    ref={studyProgramRef}
                    value={studyProgram}
                    onChange={(e) => setStudyProgram(e.target.value)}
                  >
                    {studyPrograms.map((program) => {
                      return <option value={program}>{program}</option>;
                    })}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                  <Form.Label>Study location</Form.Label>
                  <Form.Control
                    as="select"
                    ref={cityRef}
                    value={studyLocation}
                    onChange={(e) => setStudyLocation(e.target.value)}
                  >
                    {studyLocations.map((location) => {
                      return <option value={location}>{location}</option>;
                    })}
                  </Form.Control>
                </Form.Group>

                <Form.Group id="interests">
                  <Form.Label>Interests</Form.Label>

                  {/* <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Add interest"
                      aria-label="interest"
                      aria-describedby="basic-addon2"
                      ref={interestRef}
                    />
                    <InputGroup.Append>
                      <Button
                        onClick={(e) => addInterest(e)}
                        className="btn-purple py-1"
                      >
                        Add
                      </Button>
                    </InputGroup.Append>
                  </InputGroup> */}

                  <InputGroup className="mb-3 w-100">
                    <div className="w-100 d-flex justify-content-between">
                    <Select
                      className="w-85 "
                      classNamePrefix="select"
                      isClearable={true}
                      isSearchable={true}
                      name="color"
                      options={interestsArray}
                      placeholder="Add interest"
                      ref={interestRef}
                      onInputChange={(value) => {
                        setInterestInputValue(value)}}
                    />
                      <Button
                        onMouseDown={(e) => addInterest(e)}
                        className="btn-purple py-1 px-4"
                      >
                        Add
                      </Button>
                    </div>
                   
                  </InputGroup>
                  <div className="w-100 mx-auto row text-center">
                    {interests && interests !== ""
                      ? interests.map((interest, index) => {
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

                <p className="text-muted ">
                  Leave blank if you don't want to change your password
                </p>

                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Your new password"
                  />
                </Form.Group>

                <Form.Group id="password-confirm">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="Your new password"
                  />
                </Form.Group>

                <Button
                  disabled={isLoading}
                  className="btn-purple-rounded w-100 mb-3 no-active-focus-style"
                  type="submit"
                >
                  Update
                </Button>

                <Link
                  to={`/profile/${currentUser.uid}`}
                  className="btn btn-danger btn-cancel w-100 "
                  type="submit"
                >
                  Cancel
                </Link>
              </Form>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateProfile;
