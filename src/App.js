import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import HomeScreen from "./screens/HomeScreen";
import CakeScreen from "./screens/CakeScreen";
import Footer from "./components/Footer";

import { Container } from "react-bootstrap";

import "./App.css";

const App = () => {
  return (
    <Router>
      <NavMain />
      <Container>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/cakes/:id" component={CakeScreen} />
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
