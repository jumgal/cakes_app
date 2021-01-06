import React, { Fragment } from "react";
import { Row } from "react-bootstrap";
import CakeList from "../components/CakesList";
import cakes from "../cakes";

const HomeScreen = () => {
  return (
    <Fragment>
      <h1 className="mb-4 mt-4">Our Original Cakes</h1>
      <Row>
        <CakeList cakes={cakes} />
      </Row>
    </Fragment>
  );
};

export default HomeScreen;
