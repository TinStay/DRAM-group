import React, { useRef, useState, useEffect } from "react";
import classes from "./Discussions.module.scss";
import { Form } from "react-bootstrap";
import axios from "../../axios";

import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

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
      discussionID: "",
      title: titleRef.current.value,
      category: categoryRef.current.value,
      initialComment: commentRef.current.value,
      datePosted: new Date,
      comments: [],
      authorID: currentUser.uid,
      likes: 0,
    };

    // Push discussion entry to Firebase Realtime Database
    await axios.post(`/discussions.json`, newDiscussionEntry)
      .then( async(response) => {
        // Get discussion ID from Firebase and make a put request to update it
        let newDiscussionEntryWithID = {...newDiscussionEntry}

        newDiscussionEntryWithID.discussionID = response.data.name;

        await axios.put(`/discussions/${response.data.name}.json`, newDiscussionEntryWithID).then(
          (response) => {
            // console.log("Response from put request: ", response)
          }
        ).catch((err) => {
          console.log("Error from put request: ", err)
        })
      })
      .catch((err) => {
        console.log("Error in post request to Firebase Realtime Databse", err);
      });

    // Redirect to home page
    history.push("/discuss");
  };

  return (
    <div className={classes.discussion_form_container}>
      <Link className="text-decoration-none" to="discuss"><i className="fas fa-angle-left mr-1"></i>Back</Link>
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
                  return <option key={category}>{category}</option>
                })}
              </Form.Control>
            </Form.Group>
          </div>

          <div className="col-md-12">
            <Form.Group controlId="discussion-form-initial-comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control ref={commentRef} as="textarea" rows={3} required />
            </Form.Group>
          </div>
        </div>
        <div className="submit-btn">
          <button type="submit" className="btn btn-purple-rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiscussionForm;
