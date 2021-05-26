import React from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

const CakesList = ({ cakes }) => {
  return cakes.map((cake) => {
    return (
      <Col key={cake._id} md={4} lg={4} sm={6} className="mb-3">
        <Card>
          <Link to={`/cake/${cake._id}`}>
            <Card.Img
              variant="top"
              src={cake.image}
              className="img-fluid rounded"
            />
          </Link>
          <Card.Body>
            <Link to={`/cake/${cake._id}`}>
              <Card.Title>{cake.name}</Card.Title>
            </Link>
            <Card.Text>
              Rating: <strong>{cake.rating}</strong> from{" "}
              <strong>{cake.numReviews}</strong> reviews
            </Card.Text>
            <Card.Text className="mr-1">
              Price: {cake.price}
              <i className="fas fa-dollar-sign ml-1"></i>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  });
};

export default CakesList;
