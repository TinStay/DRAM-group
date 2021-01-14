import React from "react";
import classes from "./Homepage.module.scss";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

import fontysImgOne from "../../assets/images/fontys1.jpg";
import fontysImgTwo from "../../assets/images/fontys2.jpg";

const Homepage = () => {
  const { currentUser } = useAuth();

  let jumbotronParagraphClasses = [
    " mx-auto my-4 line-height",
    classes.jumbotron_paragraph,
  ];

  return (
    <div className=" my-4">
      <div className={classes.jumbotron}>
        <h1 className="font-weight-bold">
          The real information source for Fontys students
        </h1>
        <p className={jumbotronParagraphClasses.join(" ")}>
          WeFontys was made as an educational aid for those that attend Fontys
          University of Applied Sciences by a group of ICT students. Our goal is
          to provide students and teachers with a platform where they can find
          information about topics related to their studies and social life.
        </p>
      </div>
      <div class="row my-4">
        <div class="col-md-6 my-4">
          <img
            src={fontysImgOne}
            className={classes.info_image}
            alt="eindhoven image"
          />
        </div>
        <div class="col-md-6 my-4 text-center">
          <h2 className="font-weight-bold text-center mb-3">
            Set Up your Profile
          </h2>
          <p className="line-height">
            Hey! Are you a current attendee at Fonty’s? If this is the case, we
            would highly recommend you join our growing community. If you
            decided to do the right thing and sign-up, don’t forget to set up
            your profile. Setting up your profile will give others the
            opportunity to get to know you better.
          </p>
        </div>
      </div>
      <div class="row my-4">
        <div class="col-md-6 order-md-2 my-4">
          <img
            src={fontysImgTwo}
            className={classes.info_image}
            alt="eindhoven image"
          />
        </div>
        <div class="col-md-6 order-md-1 my-4 text-center">
          <h2 className="font-weight-bold text-center mb-3">Browse around</h2>
          <p className="line-height">
            Once you’ve set up your profile, why don’t you take some time to
            navigate the website? See what discussions have been recently
            published. Who knows, maybe you’ll find something to your liking!
          </p>
        </div>
      </div>
      <div class="row my-4">
        {/* <div class="col-md-12 my-4">
          <img
            src={fontysImgOne}
            className={classes.info_image}
            alt="eindhoven image"
          />
        </div> */}
        <div class="col-md-6 offset-md-3 text-center my-4">
          <h2 className="font-weight-bold mb-3">Join the Discussion</h2>
          <p className="line-height">
            Hopefully, you’re confident in navigating your new source for all
            Fontys related information. Why don’t you post your first
            discussion? Any and all questions you may have can be posted.
          </p>
        </div>
      </div>
      <div class="col-md-6 offset-md-3 text-center">
        {currentUser ? (
          <Link to="/discuss" class="btn btn-purple-rounded w-100">
            Go to discussions
          </Link>
        ) : (
          <Link to="/signup" class="btn btn-purple-rounded w-100">
            Sign up
          </Link>
        )}
      </div>
    </div>
  );
};

export default Homepage;
