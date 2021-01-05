import React from "react";
import classes from "./Discussions.module.scss";
import account_image from "../../assets/account/account_icon_purple.png";

const DiscussionBox = () => {
  return (
    <div className="border rounded px-2 py-3 row">
      <div className="col-md-3 row">
        <div className="col-6 col-md-12">
          <img
            src={account_image}
            className={classes.discussion_box_image}
            alt="img"
          />
        </div>
        <div className="col-6 col-md-12">
          <span>Username -</span>
          <span>Occupation</span>
        </div>
      </div>
      <div className="col-md-9 p-0">
        <div className="d-flex justify-content-between my-2 my-md-0 ">
          <h3>
            Heading Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptas, odit?
          </h3>
          <p>
            <span className="badge badge-primary p-2">ICT</span>
          </p>
        </div>
        <p className="my-2 text-muted">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea nesciunt
          reprehenderit animi illo atque repudiandae voluptatibus qui ab commodi
          repellendus? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Excepturi, illum?
        </p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-link p-0 my-0">Read more</button>
          <div className="icons my-0 text-muted">
            <span className="mx-2">
              <i className="far fa-comment-alt mx-1"></i> 25 Comments
            </span>
            <span className="mx-2">
              <i class="far fa-heart mx-1"></i>40 Likes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionBox;
