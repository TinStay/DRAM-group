import React, { useEffect, useState } from "react";
import classes from "./Discussions.module.scss";
import axios from "../../axios";
import account_image from "../../assets/account/account_icon_purple.png";
import { Link } from "react-router-dom";

const DiscussionBox = (props) => {
  const [authorData, setAuthorData] = useState();

  useEffect(async () => {
    // Fetch author data from Firebase
    await axios
      .get(`/users/${props.authorID}.json`)
      .then((userData) => {
        // Set user data state
        setAuthorData(userData.data);
      })
      .catch((err) => {
        console.log("Error in fetching author data: ", err);
      });
  }, [props]);

  // Display only 20 words of the initial comment
  let commentToBeDisplayed = props.initialComment.split(" ");
  commentToBeDisplayed.splice(20, commentToBeDisplayed.length - 1);

  let discussionBoxClasses = [
    "row px-2 py-3 mb-4 mx-0  rounded ",
    classes.dicussion_box,
  ];

  return (
    <div className={discussionBoxClasses.join(" ")}>
      <div className="col-lg-3 row text-center">
        <div className="col-4 col-lg-12">
          <img
            src={authorData && authorData.photoURL}
            className={classes.discussion_box_image}
            alt="img"
          />
        </div>
        <div className="col-8 col-lg-12 ">
          <Link to={`/profile/` + props.authorID} className="my-1 h5 text-decoration-none black">{authorData && authorData.username}</Link>
          <p className="my-1">{authorData && authorData.studyProgram}</p>
        </div>
      </div>
      <div className="col-lg-9 p-0">
        <div className="row my-2 my-md-0 ">
          <h3 className="col-md-9 pr-md-0">{props.title}</h3> 
          <p className="col-md-3">
            <span className="badge badge-primary purple-bgc  ml-1 px-3 py-2">
              {props.category}
            </span>
          </p>
        </div>
        <p className="my-2 text-muted">{commentToBeDisplayed.join(" ")}...</p>
        <div className="d-flex justify-content-between">
          <Link
            to={"/discussion/" + props.discussionID}
            className="btn btn-link p-0 my-0"
          >
            Read more
          </Link>
          <div className="icons my-0 text-muted">
            <span className="mx-2">
              <i className="far fa-comment-alt mx-1"></i>
              {props.comments ? props.comments.length : "0"}
            </span>
            <span className="mx-2">
              <i className="far fa-heart mx-1"></i>
              {props.likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionBox;
