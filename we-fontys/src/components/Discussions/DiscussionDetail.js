import React, { useEffect, useState, useRef } from "react";
import classes from "./Discussions.module.scss";
import axios from "../../axios";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
// import account_image from "../../assets/account/account_icon_purple.png";

// DayJS
import dayjs from "dayjs";

const DiscussionDetail = (props) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState();
  const [discussionData, setDiscussionData] = useState({});

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
        setDiscussionData(response.data);
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
    setAlertMessage("")
    setShow(true)

    const comment = commentInputRef.current.value;

    // Validate form
    if (comment === "") {
      setError("Comment field must not be empty");
    } else {
      let newDiscussionData = { ...discussionData };

      // Remove initial "none" comment entry
      if (newDiscussionData.comments) {
        if (newDiscussionData.comments[0] === "none") {
          newDiscussionData.comments.splice(0, 1);
        }

        let newCommentEntry = {
          comment: comment,
          userID: userData.userID,
          authorProfileImage: userData.photoURL,
          username: userData.username,
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
      }
    }
  };

  // Sort discussions by date - most recent first
  let sortedCommentsByDate = [];

//   useEffect(() => {
    if (discussionData.comments) {
        sortedCommentsByDate = discussionData.comments.slice().sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
        sortedCommentsByDate.map(a => console.log("a", a))
        // console.log("discussionData.comments", discussionData.comments)
    }
//   }, [sortedCommentsByDate]);

  return (
    <div className={classes.discussion_detail_container}>
      <Link className="text-decoration-none " to="/discuss">
        <i className="fas fa-angle-left mr-1"></i>Back
      </Link>
      <div className="rounded my-2 px-2 py-1 row">
        <div className="w-100 my-2 my-md-0">
          <h1 className="w-100 mb-2 pb-2 pr-md-0 border-bottom">
            {discussionData.title}
          </h1>
          <div className="d-flex justify-content-between text-muted">
            <div className="discussion-info">
              <span className="mr-2">
                <i className="far fa-heart mx-1 like-btn"></i>
                {discussionData.likes === 1
                  ? discussionData.likes + " like"
                  : discussionData.likes + " likes"}
              </span>
              <span className="mx-3">
                {dayjs(discussionData.datePosted).format("MMM DD, YYYY")}
              </span>
            </div>

            <span className="">
              <span className="badge badge-primary ml-1 px-3 py-2">
                {discussionData.category}
              </span>
            </span>
          </div>
        </div>

        <div className="initial-comment row w-100 my-4">
          <div className="col-md-2 text-center">
            <img
              src={discussionData.authorProfileImage}
              className={classes.discussion_box_image}
              alt="img"
            />
          </div>
          <div className="col-md-10">
            <p className="my-2 text-muted">{discussionData.initialComment}</p>
          </div>
        </div>

        <div className="comment-form row w-100 my-4">
          {alertMessage !== "" && show ? (
            <Alert
              className="col-12"
              variant="success"
              onClose={() => setShow(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          ) : null}
          {error !== "" && (
            <Alert className="col-12" variant="danger ">
              {error}
            </Alert>
          )}
          <div className="col-md-2 text-center">
            <img
              src={userData && userData.photoURL}
              className={classes.discussion_box_image}
              alt="img"
            />
          </div>
          <div className="col-md-10">
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Comment</Form.Label>
              <Form.Control ref={commentInputRef} as="textarea" rows={3} />
            </Form.Group>
            <Button onClick={postComment} variant="primary">
              Submit
            </Button>
          </div>
        </div>

        <div className="comments my-5 w-100">
          <div className=" pb-2 border-bottom w-100">
            <span className="text-muted  ">
              <i className="far fa-comment-alt mx-1"></i>
              {discussionData.comments ? discussionData.comments.length !== 1
                ? discussionData.comments.length + " comments"
                : discussionData.comments.length + " comment" : "0 comments"}
            </span>
          </div>
          <div class="comments">
            {discussionData.comments !== [] ? (
              sortedCommentsByDate.map((comment) => {
                return (
                  <div className="comment row w-100 my-4">
                    <div className="col-md-2 text-center">
                      <img
                        src={comment.authorProfileImage}
                        className={classes.discussion_box_image}
                        alt="img"
                      />
                      <p className="text-muted mt-1">{comment.username}</p>
                    </div>
                    <div className="col-md-10">
                      <p className="my-2 text-muted">{comment.comment}</p>
                    </div>
                  </div>
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
