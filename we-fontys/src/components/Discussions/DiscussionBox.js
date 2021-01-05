import React from "react";
import classes from "./Discussions.module.scss";
import account_image from "../../assets/account/account_icon_purple.png";

const DiscussionBox = () => {
  return (
    <div className="border rounded p-3 row">
      <div className="col-md-2 ">
        <img
          src={account_image}
          className={classes.discussion_box_image}
          alt="img"
        />
      </div>
      <div className="col-md-10 ">
        <div className="d-flex justify-content-between my-2 my-md-0 ">
          <h3>Heading</h3>
          <p>
            <span className="badge badge-primary p-2">ICT</span>
          </p>
        </div>
        <p className="my-2 text-muted">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea nesciunt
          reprehenderit animi illo atque repudiandae voluptatibus qui ab commodi
          repellendus?
        </p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-link p-0 my-0">Read more</button>
          <p className="my-0 text-muted"><i class="far fa-comment-alt"></i> 25 Comments</p>
        </div>
      </div>
    </div>
  );
};

export default DiscussionBox;
