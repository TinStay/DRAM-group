import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import DiscussionBox from "./DiscussionBox";
import axios from "../../axios";
import { db } from "../../firebase";
import { Form } from "react-bootstrap";

// React Router
import { Link } from "react-router-dom";

const Discussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortingOn, setSortingOn] = useState("Most recent");

  let sortedDiscussions = [...discussions];

  switch (sortingOn) {
    case "Most recent":
      sortedDiscussions = discussions
        .slice()
        .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
      break;
    case "Oldest":
      sortedDiscussions = discussions
        .slice()
        .sort((a, b) => new Date(a.datePosted) - new Date(b.datePosted));
      break;
    case "Most comments":
      sortedDiscussions = discussions.slice().sort((a, b) => {
        // Check if comments field exist in discussionData / Firebase removed field if empty
        if (a["comments"] === undefined || b["comments"] === undefined) {
          if (a["comments"] !== undefined) {
            // Return a big number as these discussions have 0 comments
            // and they should be at the end of the array
            return -9999;
          } else {
            return 0;
          }
        } else {
          // Sort by most commented first
          return b["comments"].length - a["comments"].length;
        }
      });
      break;
    case "Most likes":
      sortedDiscussions = discussions.slice().sort((a, b) => b.likes - a.likes);
      break;
  }

  // let sortedDiscussionsByDate = discussions
  //   .slice()
  //   .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  let filteredDiscussions = [...sortedDiscussions];

  // Filter discussions with filter
  if (filter !== "All") {
    filteredDiscussions = discussions.filter(
      (discussion) => discussion.category === filter
    );
  }

  useEffect(() => {
    axios
      .get("/discussions.json")
      .then((response) => {
        const discussionsData = [];

        // Push all discussions from Firebase in an array
        for (const discussion in response.data) {
          discussionsData.push(response.data[discussion]);
        }

        // Set state with new discussions
        setDiscussions(discussionsData);
      })
      .catch((error) => {
        console.log("Error in fetching discussion data: ", error);
      });
  }, [filter]);

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo(0, 0);
  }, []);

  const filterDiscussions = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="row mt-3">
      <div className="col-md-3 side-menu ">
        <Link
          to="/add-discussion"
          className="btn btn-purple-rounded text-center my-3 btn-block no-focus-shadow"
        >
          Add a discussion
        </Link>
        <Categories
          filterDiscussions={(e) => filterDiscussions(e.target.value)}
          filter={filter}
        />
      </div>
      <div className="col-md-9">
        <div class="d-sm-flex  justify-content-between">
          <h1 className="mt-2 mb-3 ">{filter} discussions</h1>
          <Form.Group
            className="w-md-25 my-md-auto my-3"
            controlId="sortDiscussions"
          >
            {/* <Form.Label>Sort by</Form.Label> */}
            <Form.Control
              onChange={(e) => setSortingOn(e.target.value)}
              className="border-rounded no-focus-shadow purple-border-focus "
              as="select"
            >
              <option>Most recent</option>
              <option>Oldest</option>
              <option>Most comments</option>
              <option>Most likes</option>
            </Form.Control>
          </Form.Group>
        </div>
        <div className="discussions-list">
          {discussions.length !== 0 ? (
            filteredDiscussions.map((discussion, idx) => {
              return (
                <DiscussionBox
                  key={idx}
                  discussionID={discussion.discussionID}
                  authorID={discussion.authorID}
                  title={discussion.title}
                  category={discussion.category}
                  initialComment={discussion.initialComment}
                  comments={discussion.comments}
                  likes={discussion.likes}
                />
              );
            })
          ) : (
            <h4 className="text-muted">No discussions available</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discussions;
