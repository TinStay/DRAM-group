import React from "react";
import classes from "./Homepage.module.scss";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

import fontysImgOne from "../../assets/images/fontys1.jpg";
import fontysImgTwo from "../../assets/images/fontys2.jpg";

const Homepage = () => {
  const { currentUser } = useAuth();

  let jumbotronParagraphClasses = [
    "w-md-50 mx-auto my-4 line-height",
    classes.jumbotron_paragraph,
  ];

  return (
    <div className="container my-4">
      <div className={classes.jumbotron}>
        <h1>The real information source for Fontys students</h1>
        <p className={jumbotronParagraphClasses.join(" ")}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
          mollitia numquam optio aliquid similique magnam reiciendis
          exercitationem!
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
        <div class="col-md-6 my-4">
          <h2>Lorem, ipsum dolor.</h2>
          <p className="line-height">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Necessitatibus quia animi non adipisci obcaecati distinctio eum
            tempore. Ducimus eveniet unde atque libero! Velit veniam
            exercitationem autem. Quod beatae, porro repudiandae, laboriosam
            inventore?
          </p>
        </div>
      </div>
      <div class="row my-4">
        <div class="col-md-6 my-4">
          <h2>Lorem, ipsum dolor.</h2>
          <p className="line-height">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Necessitatibus quia animi non adipisci obcaecati distinctio eum
            tempore. Ducimus eveniet unde atque libero! Velit veniam
            exercitationem autem. Quod beatae, porro repudiandae, laboriosam
            inventore?
          </p>
        </div>
        <div class="col-md-6 my-4">
          <img
            src={fontysImgTwo}
            className={classes.info_image}
            alt="eindhoven image"
          />
        </div>
      </div>
      <div class="col-12 text-center">
      {!currentUser && (
          <Link to="/signup" class="btn btn-purple-rounded w-50">
            Sign up
          </Link>
        )}

      </div>
    </div>
  );
};

export default Homepage;
