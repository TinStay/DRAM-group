import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import DiscussionBox from "./DiscussionBox";
import axios from "../../axios";
import { db } from '../../firebase'

// React Router
import { Link } from "react-router-dom";

const Discussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filter, setFilter] = useState("All");

  let sortedDiscussionsByDate = discussions.slice().sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  let filteredDiscussions = [...sortedDiscussionsByDate];

  // Filter discussions with filter
  if(filter !== "All"){
    filteredDiscussions = discussions.filter(discussion => ( 
      discussion.category === filter
    ))
  }

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
  }, [filter]);

  const filterDiscussions = (filter) => {
    console.log(filter)
    setFilter(filter)
  }
  


  return (
    <div className="row mt-3">
      <div className="col-md-3 side-menu ">
        <Link to="/add-discussion" className="btn btn-purple-rounded text-center my-3 btn-block">
          Add a discussion
        </Link>
        <Categories filterDiscussions={(e) => filterDiscussions(e.target.value)} filter={filter}/>
      </div>
      <div className="col-md-9">
        <h2 className="mt-2 mb-3 ">{filter} discussions</h2>
        <div className="discussions-list">
          {discussions.length !== 0 ? filteredDiscussions.map((discussion, idx) => {
            return <DiscussionBox 
            key={idx}
            discussionID={discussion.discussionID}
            authorID={discussion.authorID}
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
