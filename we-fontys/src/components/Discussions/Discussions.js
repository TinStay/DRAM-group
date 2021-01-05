import React from "react";
import Categories from './Categories'
import DiscussionBox from './DiscussionBox'

const Discussions = () => {
  return (
    <div className="row mt-3">
        
        <div className="col-md-3 side-menu ">
            <button className="btn btn-primary my-3 btn-block">Add a discussion</button>
            <Categories />
        </div>
        <div className="col-md-9">
        <h1 className="mb-4">Discussions</h1>
        <div className="discussions-list">
            <DiscussionBox />
        </div>
        </div>
    </div>
  )
};

export default Discussions;
