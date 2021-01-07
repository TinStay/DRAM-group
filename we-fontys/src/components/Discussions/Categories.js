import React from "react";
import { ListGroup } from 'react-bootstrap'

const Categories = (props) => {
  return (
    <ListGroup defaultActiveKey="#link1">
      <ListGroup.Item action value="All" onClick={(e) => props.filterDiscussions(e)}>
        All
      </ListGroup.Item>
      <ListGroup.Item action value="COVID-19" onClick={(e) => props.filterDiscussions(e)}>
        COVID-19
      </ListGroup.Item>
      <ListGroup.Item action value="Arts" onClick={(e) => props.filterDiscussions(e)}>
        Arts
      </ListGroup.Item>
      <ListGroup.Item action value="Communications" onClick={(e) => props.filterDiscussions(e)}>
        Communications
      </ListGroup.Item>
      <ListGroup.Item action value="Business" onClick={(e) => props.filterDiscussions(e)}>
        Business
      </ListGroup.Item>
      <ListGroup.Item action value="Engineering" onClick={(e) => props.filterDiscussions(e)}>
        Engineering
      </ListGroup.Item>
      <ListGroup.Item action value="Healthcare" onClick={(e) => props.filterDiscussions(e)}>
        Healthcare
      </ListGroup.Item>
      <ListGroup.Item action value="ICT" onClick={(e) => props.filterDiscussions(e)}>
        ICT
      </ListGroup.Item>
      <ListGroup.Item action value="Logistics" onClick={(e) => props.filterDiscussions(e)}>
        Logistics
      </ListGroup.Item>
      <ListGroup.Item action value="International" onClick={(e) => props.filterDiscussions(e)}>
        International
      </ListGroup.Item>
      <ListGroup.Item action value="Intership" onClick={(e) => props.filterDiscussions(e)}>
        Intership
      </ListGroup.Item>
      <ListGroup.Item action value="Other" onClick={(e) => props.filterDiscussions(e)}>
        Other
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Categories;
