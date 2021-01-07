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
      <div className="col-md-3 row">
        <div className="col-6 col-md-12">
          <img
            src={account_image}
            className={classes.discussion_box_image}
            alt="img"
          />
        </div>
        <div className="col-6 col-md-12">
          <span>{props.author}</span>
          <span>Occupation</span>
        </div>
      </div>
      <div className="col-md-9 p-0">
        <div className="d-flex justify-content-between my-2 my-md-0 ">
          <h3>{props.title}</h3>
          <p>
            <span className="badge badge-primary p-2">{props.category}</span>
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
