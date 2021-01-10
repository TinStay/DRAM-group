import React, { useState, useEffect } from "react";
import classes from "../Discussions.module.scss";
import axios from "../../../axios";

const DiscussionComment = (props) => {
  const [authorData, setAuthorData] = useState();

  useEffect(async () => {
    // Fetch author data from Firebase
    await axios
      .get(`/users/${props.commentData.authorID}.json`)
      .then((userData) => {
        // Set user data state
        setAuthorData(userData.data);
      })
      .catch((err) => {
        console.log("Error in fetching author data: ", err);
      });
  }, [props]);

  const initialComment = props.commentData.initialComment;

  return (
    <div className="comment row border-bottom pb-3 my-4 mx-auto">
      <div className="col-md-2">
        <div className="mx-md-auto d-flex d-md-block justify-content-start ">
        <img
          src={authorData && authorData.photoURL}
          className={classes.discussion_box_image}
          alt="profile image"
        />
        <p className="text-muted mt-1">{authorData && authorData.username}</p>

        </div>
      </div>
      <div className="col-md-10">
        <p className="my-2 text-muted">
          {initialComment ? initialComment : props.commentData.comment}
        </p>
      </div>
    </div>
  );
};

export default DiscussionComment;
