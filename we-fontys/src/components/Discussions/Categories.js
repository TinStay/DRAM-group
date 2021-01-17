import React from "react";
import { ListGroup, Form } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const Categories = (props) => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const categoryList = [
    "All",
    "COVID-19",
    "Arts",
    "Communications",
    "Business",
    "Engineering",
    "Healthcare",
    "ICT",
    "Logistics",
    "International",
    "Intership",
    "Other",
  ];

  return (
    <div>
      {isMobile ? (
        <Form.Group className="  my-4" controlId="discussion-form-category">
          <Form.Control className="no-focus-shadow border-rounded" as="select" onChange={(e) => props.filterDiscussions(e)}>
            {categoryList.map((category, idx) => {
              return (
                <option
                  value={category}
                  key={idx}>
                  {category}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      ) : (
        <ListGroup>
          {categoryList.map((category, idx) => {
            return <ListGroup.Item
            action
            className="no-focus-shadow"
            key={idx}
            value={category}
            active={props.filter == category}
            onClick={(e) => props.filterDiscussions(e)}
          >
            {category}
          </ListGroup.Item>
          })}
        </ListGroup>
      )}
    </div>
  );
};

export default Categories;
