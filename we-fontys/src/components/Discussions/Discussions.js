import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import DiscussionBox from "./DiscussionBox";
import axios from "../../axios";
import { db } from '../../firebase'

// React Router
import { Link, useHistory } from "react-router-dom";

const Discussions = () => {
  const [discussions, setDiscussions] = useState([]);
  let history = useHistory()

  useEffect(() => {
    axios
      .get("/discussions.json")
      .then((response) => {
        const discussionsData = []
        

        // Push all discussions from Firebase in an array
        for(const discussion in response.data){
          
          discussionsData.push(response.data[discussion]);
        }

        // Set state with new discussions
        setDiscussions(discussionsData);
      })
      .catch((error) => {
        console.log("Error in fetching discussion data: ", error);
      });
  }, [db]);


  return (
    <div className="row mt-3">
      <div className="col-md-3 side-menu ">
        <Link to="/add-discussion" className="btn btn-primary my-3 btn-block">
          Add a discussion
        </Link>
        <Categories />
      </div>
      <div className="col-md-9">
        <h1 className="mb-4">All discussions</h1>
        <div className="discussions-list">
          {discussions.length !== 0 ? discussions.map((discussion, idx) => {
            return <DiscussionBox 
            key={idx}
            author={discussion.author}
            title={discussion.title}
            category={discussion.category}
            initialComment={discussion.initialComment}
            comments={discussion.comments}
            likes={discussion.likes}
            />;
          }) : <h4 className="text-muted">No discussions available</h4> }
        </div>
      </div>
    </div>
  );
};

export default Discussions;
