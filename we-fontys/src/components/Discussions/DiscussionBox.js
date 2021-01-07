import React from "react";
import classes from "./Discussions.module.scss";
import account_image from "../../assets/account/account_icon_purple.png";

const DiscussionBox = (props) => {
  
  // Display only 20 words of the initial comment
  let commentToBeDisplayed = props.initialComment.split(" ");
  commentToBeDisplayed.splice(20, commentToBeDisplayed.length - 1)

  let discussionBoxClasses = ["border rounded px-2 py-3 row", classes.dicussion_box];

  return (
    <div className={discussionBoxClasses.join(" ")}>
      <div className="col-lg-3 row text-center">
        <div className="col-4 col-lg-12">
          <img
            src={props.authorProfileImage}
            className={classes.discussion_box_image}
            alt="img"
          />
        </div>
        <div className="col-8 col-lg-12 ">
          <p className="my-1 h5">{props.author}</p>
          <p className="my-1">{props.authorStudyProgram}</p>
        </div>
      </div>
      <div className="col-lg-9 p-0">
        <div className="row my-2 my-md-0 ">
          <h3 className="col-md-10 pr-md-0">{props.title}</h3>
          <p className="col-md-2 ">
            <span className="badge badge-primary ml-1 px-3 py-2">{props.category}</span>
          </p>
        </div>
        <p className="my-2 text-muted">{commentToBeDisplayed.join(" ")}...</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-link p-0 my-0">Read more</button>
          <div className="icons my-0 text-muted">
            <span className="mx-2">
              <i className="far fa-comment-alt mx-1"></i>
              {props.comments}
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
