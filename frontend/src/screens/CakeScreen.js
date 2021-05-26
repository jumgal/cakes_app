import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchACake } from "../actions/cakeActions";
import { Col, Row, Image, ListGroup, Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CakeScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  // useEffect(() => {
  //   const fetchCakes = async () => {
  //     const { data } = await axios.get("/api/cakes");
  //     const cake = data.find((c) => c._id === match.params.id);
  //     setCake(cake);
  //   };
  //   fetchCakes();
  // }, [match]);

  // useEffect(() => {
  //   const fetchACake = async () => {
  //     const { data } = await axios.get(`/api/cakes/${match.params.id}`);
  //     setCake(data);
  //   };
  //   fetchACake();
  // }, [match]);

  // console.log(cake);

  const dispatch = useDispatch();

  const single_cake = useSelector((state) => state.single_cake);

  const { loading, cake, error } = single_cake;

  useEffect(() => {
    dispatch(fetchACake(match.params.id));
  }, [dispatch, match]);


  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };


  return (
    <Fragment>
      <Link to="/">
        <Button variant="primary" className="mb-5">
          <i className="fas fa-backward mr-2"></i>See all Cakes
        </Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message />
      ) : (
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
            <Card>
              <ListGroup variant='flash'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{cake.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Available: </Col>
                    <Col>{cake.countInStock > 0 ? "Yes" : "No"}</Col>
                  </Row>
                </ListGroup.Item>

                {cake.countInStock > 0 ? (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(cake.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ) : null}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={cake.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default CakeScreen;
