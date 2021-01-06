import React, { Fragment } from "react";
import cakes from "../cakes";
import { Col, Row, Image, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CakeScreen = ({ match }) => {
  const cake = cakes.find((c) => c._id === match.params.id);
  console.log(cake);
  console.log(match);
  return (
    <Fragment>
      <Link to="/">
        <Button variant="primary" className="mb-3">
          See all Cakes
        </Button>
      </Link>
      <Row>
        <Col md={5}>
          <Image src={cake.image} alt={cake.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{cake.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              Rating: <strong>{cake.rating} </strong> from{" "}
              <strong>{cake.numReviews}</strong> reviews
            </ListGroup.Item>
            <ListGroup.Item>
              Price: <strong>{cake.price}</strong>
              <i className="fas fa-dollar-sign ml-1"></i>
            </ListGroup.Item>
            <ListGroup.Item>{cake.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>Price: {cake.price}</ListGroup.Item>
            <ListGroup.Item>
              Available: {cake.countInStock ? "Yes" : "No"}
            </ListGroup.Item>
            <ListGroup.Item>
              {cake.countInStock > 0 ? (
                <Button variant="dark" block>
                  Add to Cart
                </Button>
              ) : (
                <Button variant="secondary" disabled block>
                  Add to Cart
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CakeScreen;
