import React, { useState, useEffect } from "react";
import classes from "../Discussions.module.scss";
import axios from "../../../axios";
import dayjs from "dayjs"
import account_image from '../../../assets/account/account_icon_purple.png'

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
  const datePostedFormatted = dayjs(props.commentData.datePosted).format("MMM DD, YYYY");

  return (
    <div className="comment row border-bottom pb-3 my-4 mx-auto">
      <div className="col-md-2 mb-2">
        <div className="mx-md-auto d-flex d-md-block justify-content-start ">
          <div className="text-center mr-2 mr-md-0">
            <img
              src={
                authorData
                ? authorData.photoURL !== ""
                  ? authorData.photoURL
                  : account_image
                : account_image}
              className={classes.discussion_box_image}
              alt="profile image"
            />
          </div>
          <div className="text-center my-auto">
            <p className="text-muted mt-1 mb-0 ">
              {authorData && authorData.username}
            </p>
            <span className="mx-auto text-muted ">
              {datePostedFormatted}
            </span>
          </div>
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
