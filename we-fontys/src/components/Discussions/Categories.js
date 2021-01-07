import React from "react";
import { ListGroup } from 'react-bootstrap'

const Categories = () => {
  return (
    <ListGroup defaultActiveKey="#link1">
      <ListGroup.Item action >
        COVID-19
      </ListGroup.Item>
      <ListGroup.Item action >
        Arts
      </ListGroup.Item>
      <ListGroup.Item action >
        Communications
      </ListGroup.Item>
      <ListGroup.Item action >
        Business
      </ListGroup.Item>
      <ListGroup.Item action >
        Engineering
      </ListGroup.Item>
      <ListGroup.Item action >
        Healthcare
      </ListGroup.Item>
      <ListGroup.Item action >
        ICT
      </ListGroup.Item>
      <ListGroup.Item action >
        Logistics
      </ListGroup.Item>
      <ListGroup.Item action >
        International
      </ListGroup.Item>
      <ListGroup.Item action >
        Intership
      </ListGroup.Item>
      <ListGroup.Item action >
        Other
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Categories;
