import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCakes } from "../actions/cakeActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Row } from "react-bootstrap";
import CakeList from "../components/CakesList";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const cakes_List = useSelector((state) => state.cakesList);
  const { cakes, loading, error } = cakes_List;

  useEffect(() => {
    dispatch(fetchAllCakes());
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchCakes = async () => {
  //     const { data } = await axios.get("/api/cakes");
  //     setCakes(data);
  //   };
  //   fetchCakes();
  // }, []);

  return (
    <Fragment>
      <h1 className="mb-4 mt-4">Our Original Cakes</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message error={error} />
      ) : (
        <Row className="pb-5">
          <CakeList cakes={cakes} />
        </Row>
      )}
    </Fragment>
  );
};

export default HomeScreen;
