import React from "react";
import { ListGroup } from 'react-bootstrap'

const Categories = () => {
  return (
    <ListGroup defaultActiveKey="#link1">
      <ListGroup.Item action href="#link1">
        ICT
      </ListGroup.Item>
      <ListGroup.Item action href="#link2">
        Business
      </ListGroup.Item>
      <ListGroup.Item action href="#link3">
        COVID-19
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Categories;
