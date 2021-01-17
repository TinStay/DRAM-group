import React, { useEffect, useState, useRef } from "react";
import classes from "../Discussions.module.scss";
import axios from "../../../axios";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../../Context/AuthContext";
import DiscussionComment from "./DiscussionComment";
import account_image from "../../../assets/account/account_icon_purple.png";

// DayJS
import dayjs from "dayjs";

const DiscussionDetail = (props) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState();
  const [discussionData, setDiscussionData] = useState({});
  const [isDiscussionLiked, setIsDiscussionLiked] = useState(false);

  // Alert and error
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");

  const commentInputRef = useRef();

  // Fetch discussion data from Firebase Realtime Database
  useEffect(() => {
    axios
      .get(`/discussions/${props.match.params.id}.json`)
      .then((response) => {
        // Update state
        setDiscussionData(response.data);

        let likedBy = response.data.likedBy;

        if (likedBy !== undefined) {
          if (likedBy.includes(currentUser.uid)) {
            // console.log(discussionData.likedBy.includes(currentUser.uid))
            setIsDiscussionLiked(true);
          } else {
            // console.log(discussionData.likedBy.includes(currentUser.uid))
            setIsDiscussionLiked(false);
          }
        }
      })
      .then(() => {
        // Fetch user data from Firebase
        axios
          .get(`/users/${currentUser.uid}.json`)
          .then((userData) => {
            // Set user data state
            setUserData(userData.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((error) => {
        console.log("Error in fetching discussion data: ", error);
      });
  }, []);

  const postComment = async () => {
    // Reset error and alert
    setError("");
    setAlertMessage("");
    setShow(true);

    // Get the comment text from from
    const comment = commentInputRef.current.value;

    // Validation
    if (comment === "") {
      setError("Comment field must not be empty");
    } else {
      let newDiscussionData = { ...discussionData };

      // Check whether comments field exists
      if (newDiscussionData.comments) {
        // Remove initial "none" comment entry if it exists
        if (newDiscussionData.comments[0] === "none") {
          newDiscussionData.comments.splice(0, 1);
        }
      } else {
        // Add a comments field if it doesn't existing
        newDiscussionData = {
          ...newDiscussionData,
          comments: [],
        };
      }

      // Initialize comment object
      let newCommentEntry = {
        comment: comment,
        authorID: userData.userID,
        datePosted: new Date(),
      };

      // Push comment to comments array
      newDiscussionData.comments.push(newCommentEntry);

      // Make a put request to update discussion comments data
      await axios
        .put(`/discussions/${props.match.params.id}.json`, newDiscussionData)
        .then((response) => {
          //   console.log("Response from put request: ", response.data);
        })
        .catch((error) => {
          console.log("Error in fetching discussion data: ", error);
        });

      setAlertMessage("You successfuly posted your comment");

      // Reset field
      commentInputRef.current.value = "";

      // Update state
      setDiscussionData(newDiscussionData);
    }
  };

  // Sort discussions by date - most recent first
  let sortedCommentsByDate = [];

  if (discussionData.comments) {
    sortedCommentsByDate = discussionData.comments
      .slice()
      .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
  }

  const likeDiscussion = () => {
    // Get discussion data
    let newDiscussionData = { ...discussionData };

    // Update liked by users array
    if (newDiscussionData.likedBy !== undefined) {
      const idxUserInLikedBy = newDiscussionData.likedBy.indexOf(
        currentUser.uid
      );

      // Remove user ID from likedBy array
      if (idxUserInLikedBy != -1 && isDiscussionLiked === true) {
        newDiscussionData.likedBy.splice(idxUserInLikedBy, 1);

        newDiscussionData.likes -= 1;
      } else if (isDiscussionLiked === false) {
        // Push user ID to likedBy list
        newDiscussionData.likedBy.push(currentUser.uid);
        newDiscussionData.likes += 1;
      }
    } else {
      // Add a likedBy array to newDiscussionData object
      if (newDiscussionData.likedBy === undefined) {
        newDiscussionData = {
          ...newDiscussionData,
          likedBy: [],
        };
      }

      // Add user ID to likedBy list if this is first like
      if (isDiscussionLiked === false) {
        newDiscussionData.likedBy.push(currentUser.uid);

        newDiscussionData.likes += 1;
      }
    }

    //Update state
    setIsDiscussionLiked(!isDiscussionLiked);
    setDiscussionData(newDiscussionData);

    // Push new discussion data to Firebase Realtime Database
    // Make a put request to update discussion likes
    axios
      .put(`/discussions/${props.match.params.id}.json`, newDiscussionData)
      .then((response) => {
        //   console.log("Response from put request: ", response.data);
      })
      .catch((error) => {
        console.log("Error in fetching discussion data: ", error);
      });
  };

  return (
    <div className={classes.discussion_detail_container}>
      <Link className="text-decoration-none " to="/discuss">
        <i className="fas fa-angle-left mr-1"></i>Back
      </Link>
      <div className="rounded mb-2 px-2 py-1 row">
        <div className="w-100 my-2 my-md-0">
          <h1 className="w-100 mb-2 pb-2 pr-md-0 border-bottom">
            {discussionData.title}
          </h1>
          <div className="d-flex justify-content-between text-muted">
            <div className="discussion-info">
              <span className="mr-2">
                <span className="badge badge-primary purple-badge ml-1 px-3 py-2">
                  {discussionData.category}
                </span>
              </span>
              <span className="mx-3">
                {dayjs(discussionData.datePosted).format("MMM DD, YYYY")}
              </span>
            </div>

            <span className="">
              <i
                onClick={() => likeDiscussion()}
                className={
                  isDiscussionLiked
                    ? "fas fa-heart red like-btn mx-1"
                    : "far fa-heart like-btn mx-1"
                }
              ></i>
              {discussionData.likes === 1
                ? discussionData.likes + " like"
                : discussionData.likes + " likes"}
            </span>
          </div>
        </div>

        {/* Initial comment */}
        <div class="w-100">
          <DiscussionComment commentData={discussionData} />
        </div>

        <div className="comment-form row w-100 mx-auto my-1">
          {alertMessage !== "" && show ? (
            <Alert
              className="col-12 mx-auto"
              variant="success"
              onClose={() => setShow(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          ) : null}
          {error !== "" && show ? (
            <Alert
              className="col-12 mx-auto"
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              {error}
            </Alert>
          ) : null}
          <div className="col-md-2 mb-1">
            <div className="mx-md-auto d-flex d-md-block justify-content-start ">
              <Link
                to={`/profile/` + currentUser.uid}
                className="  text-decoration-none black-text d-block"
              >
                <div className="text-center mr-2 mr-md-0 ">
                  <img
                    src={
                      userData
                        ? userData.photoURL !== ""
                          ? userData.photoURL
                          : account_image
                        : account_image
                    }
                    className={classes.discussion_box_image}
                    alt="img"
                  />
                </div>
                <div className="text-center my-auto">
                  <p className="text-muted mt-1 h5 black-text">
                    {userData && userData.username}
                  </p>
                </div>
              </Link>
              <Link
                to={`/profile/` + currentUser.uid}
                className="  text-decoration-none black-text d-block"
              ></Link>
            </div>
          </div>
          <div className=" col-md-10">
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Comment</Form.Label>
              <Form.Control ref={commentInputRef} as="textarea" readonly rows={3} />
            </Form.Group>
            <Button onClick={postComment} className="btn-purple-rounded">
              Post
            </Button>
          </div>
        </div>

        <div className="comments my-5 w-100">
          <div className=" pb-2 border-bottom w-100">
            <span className="text-muted text-middle">
              <i className="far fa-comment-alt mx-1"></i>
              {discussionData.comments
                ? discussionData.comments.length !== 1
                  ? discussionData.comments.length + " comments"
                  : discussionData.comments.length + " comment"
                : "0 comments"}
            </span>
          </div>
          <div className="comments">
            {discussionData.comments !== [] ? (
              sortedCommentsByDate.map((commentData) => {
                return (
                  <DiscussionComment
                    key={commentData.datePosted}
                    commentData={commentData}
                  />
                );
              })
            ) : (
              <p>No comments yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetail;
