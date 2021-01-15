import React from "react";
import classes from "./Homepage.module.scss";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

import homeImageOne from "../../assets/images/deskImage.svg";
import homeImageTwo from "../../assets/images/socialImage.png";
import homeImageThree from "../../assets/images/phoneImage.png";

const Homepage = () => {
  const { currentUser } = useAuth();

  let jumbotronParagraphClasses = [
    "col-md-6 mx-auto my-5 line-height",
    classes.jumbotron_paragraph,
  ];

  return (
    <div className="my-4">
      <div className={classes.jumbotron}>
        <h1 className="mt-5">The real information source for Fontys students</h1>
        <p className={jumbotronParagraphClasses.join(" ")}>
          Our goal is to bring Fontys students and teachers together and provide
          them with a platform where they can find relevant information about
          topics related to their studies and social life.
        </p>
      </div>
      <div class="row my-5 white-bgc">
        <div class="col-md-6 my-4 text-center">
          <img
            src={homeImageOne}
            className={classes.info_image}
            alt="working man image"
          />
        </div>
        <div class="col-md-6 my-4 text-center my-auto">
          <h2 className="font-weight-semibold text-center mb-3 ">
            Set Up Your Profile
          </h2>
          <p className="col-md-10 offset-md-1 line-height">
            Hey! Are you a current attendee at Fontys? If this is the case, we
            would highly recommend you join our growing community. Sign up and
            set up your profile with information about your studies and
            interests. By doing so you will give others the opportunity to get
            to know you better.
          </p>
        </div>
      </div>
      <div class="row my-5">
        <div class="col-md-6 order-md-2 my-4 text-center">
          <img
            src={homeImageTwo}
            className={classes.info_image}
            alt="computer image"
          />
        </div>
        <div class="col-md-6 order-md-1 my-4 text-center my-auto">
          <h2 className="font-weight-semibold text-center mb-3">
            Browse Around
          </h2>
          <p className="col-md-10 offset-md-1 line-height">
            Once you’ve set up your profile, why don’t you take some time to
            navigate the website? See what discussions have been recently
            published. Who knows, maybe you’ll find something to your liking!
          </p>
        </div>
      </div>
      <div class="row my-5">
        <div class="col-md-6 my-4 text-center">
          <img
            src={homeImageThree}
            className={classes.info_image}
            alt="phone image"
          />
        </div>
        <div class="col-md-6  text-center my-auto">
          <h2 className="font-weight-semibold mb-3">Join the Discussion</h2>
          <p className="col-md-10 offset-md-1 line-height mb-5">
            Do you want to ask somebody about something regarding your studies?
            Why don’t you post your first discussion? All questions you may have
            are welcomed by our community.
          </p>
          {currentUser ? (
            <Link to="/discuss" class="col-md-10 btn btn-purple-rounded w-100">
              Go to discussions
            </Link>
          ) : (
            <Link to="/signup" class="btn btn-purple-rounded w-100">
              Sign up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
