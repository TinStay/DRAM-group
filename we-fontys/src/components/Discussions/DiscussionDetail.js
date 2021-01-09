import React, { useEffect, useState } from "react";
import classes from "./Discussions.module.scss";
import axios from "../../axios";
import { Link, useHistory } from "react-router-dom";
// import account_image from "../../assets/account/account_icon_purple.png";

const DiscussionDetail = (props) => {
  const [discussionData, setDiscussionData] = useState({});
  const history = useHistory();

  // Fetch discussion data from Firebase Realtime Database
  useEffect(() => {
    axios
      .get(`/discussions/${props.match.params.id}.json`)
      .then((response) => {
        setDiscussionData(response.data);
      })
      .catch((error) => {
        console.log("Error in fetching discussion data: ", error);
      });
  }, []);

  return (
    <div className={classes.discussion_detail_container}>
      <Link className="text-decoration-none " to="/discuss">
        <i className="fas fa-angle-left mr-1"></i>Back
      </Link>
      <div className=" rounded my-2 px-2 py-1 row">
        {/* <div className="col-lg-3 row text-center">
          <div className="col-4 col-lg-12">
            <img
              src={discussionData.authorProfileImage}
              className={classes.discussion_box_image}
              alt="img"
            />
          </div>
          <div className="col-8 col-lg-12 ">
            <p className="my-1 h5">{discussionData.author}</p>
            <p className="my-1">{discussionData.authorStudyProgram}</p>
          </div>
        </div> */}
        <div className="row my-2 my-md-0 ">
          <h1 className="col-md-12 border-bottom pr-md-0">
            {discussionData.title}
          </h1>
          <p className="col-md-3">
            <span className="badge badge-primary ml-1 px-3 py-2">
              {discussionData.category}
            </span>
          </p>
          <p>
            <span class="date">{discussionData.datePosted}</span>
          </p>
        </div>
        <p className="my-2 text-muted">{discussionData.initialComment}</p>
        <div className="d-flex justify-content-end">
          <div className="icons my-0 text-muted">
            <span className="mx-2">
              <i className="far fa-comment-alt mx-1"></i>
              {discussionData.comments}
            </span>
            <span className="mx-2">
              <i className="far fa-heart mx-1"></i>
              {discussionData.likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetail;
