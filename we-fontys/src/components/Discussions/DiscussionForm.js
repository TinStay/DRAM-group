import React, { useRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import classes from "./Discussions.module.scss";
import axios from "../../axios";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";
import { db } from "../../firebase";

const DiscussionForm = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState();
  const history = useHistory();

  const categoryList = ["COVID-19", "Arts", "Communications", "Business", "Engineering", "Healthcare", "ICT", "Logistics", "International", "Intership", "Other",]

  const titleRef = useRef();
  const categoryRef = useRef();
  const commentRef = useRef();

  // Fetch data from Firebase Realtime Database
  useEffect(() => {
    axios
      .get(`/users/${currentUser.uid}.json`)
      .then((userData) => {
        // Set user data state
        setUserData(userData.data);
      })
      .catch((err) => {
        console.log("Error in fetching data from Firebase", err);
      });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Discussion entry data that will be saved to Firebase Realtime Database
    let newDiscussionEntry = {
      title: titleRef.current.value,
      category: categoryRef.current.value,
      initialComment: commentRef.current.value,
      datePosted: new Date,
      comments: ["none"],
      author: userData.username,
      authorEmail: userData.email,
      authorID: currentUser.uid,
      authorProfileImage: userData.photoURL,
      authorStudyProgram: userData.studyProgram,
      likes: 0,
      comments: 1
    };

    // Push discussion entry to Firebase Realtime Database
    // db.ref(`/discussions/${currentUser.uid}`).set(newDiscussionEntry);
    await axios.post(`/discussions.json`, newDiscussionEntry)
      .then(() => {

      })
      .catch((err) => {
        console.log("Error in post request to Firebase Realtime Databse", err);
      });

    // Redirect to home page
    history.push("/discuss");
  };

  return (
    <div className={classes.discussion_form_container}>
      <h1 className="mb-3">Add a discussion</h1>
      <form onSubmit={handleFormSubmit} className="">
        <div className="row">
          <div className="col-md-8">
            <Form.Group id="discussion-form-title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                ref={titleRef}
                type="text"
                placeholder="Title of discussion"
                required
              />
            </Form.Group>
          </div>
          <div className="col-md-4">
            <Form.Group controlId="discussion-form-category">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" ref={categoryRef}>
                {categoryList.map(category =>{
                  return <option>{category}</option>
                })}
              </Form.Control>
            </Form.Group>
          </div>

          <div className="col-md-12">
            <Form.Group controlId="discussion-form-initial-comment">
              <Form.Label>Initial comment</Form.Label>
              <Form.Control ref={commentRef} as="textarea" rows={3} required />
            </Form.Group>
          </div>
        </div>
        <div className="submit-btn">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiscussionForm;
